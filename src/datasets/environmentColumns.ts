import { trace } from "@opentelemetry/api";
import { HnyTricksAuthorization } from "../common";
import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { currentTraceId } from "../tracing-util";
import { StatusUpdate } from "../status";
import { 
  EnvironmentColumnAlias,
  generateEnvironmentFormula,
  ENVIRONMENT_COLUMN_DEFINITIONS
} from "./derivedColumns";

type DatasetSlug = string;

type ListDerivedColumnResponse = {
  id: string;
  alias: string;
  expression: string;
  description: string;
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
};

type EnvironmentColumnExistsInput = {
  slug: DatasetSlug;
  alias: EnvironmentColumnAlias;
};

type EnvironmentColumnCreationStatus =
  | { slug: DatasetSlug; alias: EnvironmentColumnAlias; created: true }
  | { slug: DatasetSlug; alias: EnvironmentColumnAlias; created: false; error: string };

/**
 * Check if an environment-level derived column exists for a specific dataset
 */
export async function environmentColumnExists(
  auth: HnyTricksAuthorization,
  input: EnvironmentColumnExistsInput
): Promise<{ exists: boolean; correctFormula: boolean; error?: string }> {
  const span = trace.getActiveSpan();
  const { slug, alias } = input;
  
  span?.setAttributes({
    "app.environment_column.slug": slug,
    "app.environment_column.alias": alias,
  });

  const apiUrl = `derived_columns/${slug}?alias=${alias}`;
  const result = await fetchFromHoneycombApi<ListDerivedColumnResponse>(
    { apiKey: auth.apiKey, keyInfo: auth.keyInfo },
    apiUrl
  );

  if (isFetchError(result)) {
    if (result.statusCode === 404) {
      return { exists: false, correctFormula: false };
    } else {
      return { exists: false, correctFormula: false, error: result.message };
    }
  }

  const expectedExpression = generateEnvironmentFormula(alias, auth);
  span?.setAttributes({
    "app.environment_column.expectedExpression": expectedExpression,
    "app.environment_column.observedExpression": result.expression,
  });

  const correctFormula = expectedExpression === result.expression;
  return { exists: true, correctFormula };
}

/**
 * Create an environment-level derived column for a specific dataset
 */
export async function createEnvironmentColumn(
  auth: HnyTricksAuthorization,
  slug: DatasetSlug,
  alias: EnvironmentColumnAlias
): Promise<EnvironmentColumnCreationStatus> {
  const url = "/derived_columns/" + slug;
  
  const columnDefinition = ENVIRONMENT_COLUMN_DEFINITIONS[alias];
  const expression = columnDefinition.formulaGenerator(auth);
  
  const data = {
    alias,
    expression,
    description: columnDefinition.description,
  };

  const result = await fetchFromHoneycombApi(
    {
      apiKey: auth.apiKey,
      keyInfo: auth.keyInfo,
      method: "POST",
      body: data,
    },
    url
  );

  if (isFetchError(result)) {
    return { slug, alias, created: false, error: result.message };
  }
  
  return { slug, alias, created: true };
}

/**
 * Create environment columns across multiple datasets
 */
export async function createEnvironmentColumnsForDatasets(
  auth: HnyTricksAuthorization,
  datasetSlugs: DatasetSlug[],
  aliases: EnvironmentColumnAlias[]
): Promise<StatusUpdate> {
  const results: EnvironmentColumnCreationStatus[] = [];

  // Create all combinations of datasets and aliases
  for (const slug of datasetSlugs) {
    for (const alias of aliases) {
      const result = await createEnvironmentColumn(auth, slug, alias);
      results.push(result);
    }
  }

  const success = results.every((r) => r.created);
  const successCount = results.filter((r) => r.created).length;
  const totalCount = results.length;

  const statusMessages = results.map((r) => {
    if (r.created) {
      return `✅ Column ${r.alias} created in ${r.slug}`;
    } else {
      return `❌ Failed to create ${r.alias} in ${r.slug}: ${r.error}`;
    }
  });

  return {
    success,
    html: [
      `<p>Environment column creation: ${successCount}/${totalCount} successful</p>`,
      ...statusMessages.map(msg => `<p>${msg}</p>`)
    ]
  };
}

/**
 * Check environment column status across multiple datasets
 */
export async function checkEnvironmentColumnStatus(
  auth: HnyTricksAuthorization,
  datasetSlugs: DatasetSlug[],
  alias: EnvironmentColumnAlias
): Promise<{
  totalDatasets: number;
  datasetsWithColumn: number;
  datasetsWithCorrectFormula: number;
  missingDatasets: DatasetSlug[];
  incorrectFormulaDatasets: DatasetSlug[];
}> {
  const results = await Promise.all(
    datasetSlugs.map(async (slug) => {
      const status = await environmentColumnExists(auth, { slug, alias });
      return { slug, ...status };
    })
  );

  const datasetsWithColumn = results.filter(r => r.exists).length;
  const datasetsWithCorrectFormula = results.filter(r => r.exists && r.correctFormula).length;
  const missingDatasets = results.filter(r => !r.exists).map(r => r.slug);
  const incorrectFormulaDatasets = results.filter(r => r.exists && !r.correctFormula).map(r => r.slug);

  return {
    totalDatasets: datasetSlugs.length,
    datasetsWithColumn,
    datasetsWithCorrectFormula,
    missingDatasets,
    incorrectFormulaDatasets
  };
}