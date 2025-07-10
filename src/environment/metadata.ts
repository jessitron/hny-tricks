import { HnyTricksAuthorization } from "../common";
import { 
  ENVIRONMENT_COLUMN_ALIASES, 
  EnvironmentColumnAlias,
  ENVIRONMENT_COLUMN_DEFINITIONS 
} from "../datasets/derivedColumns";

/**
 * Environment metadata utilities for environment-level derived columns
 */

export type EnvironmentColumnStatus = {
  alias: EnvironmentColumnAlias;
  description: string;
  expectedFormula: string;
  datasetsWithColumn: number;
  totalDatasets: number;
  allDatasetsHaveColumn: boolean;
};

export type EnvironmentMetadata = {
  environmentName: string;
  teamName: string;
  region: string;
  environmentType: string;
  availableColumns: EnvironmentColumnAlias[];
};

/**
 * Extract environment metadata from authorization context
 */
export function getEnvironmentMetadata(auth: HnyTricksAuthorization): EnvironmentMetadata {
  return {
    environmentName: auth.environment.name,
    teamName: auth.team.name,
    region: auth.keyInfo.region,
    environmentType: auth.keyInfo.environmentType,
    availableColumns: Object.values(ENVIRONMENT_COLUMN_ALIASES)
  };
}

/**
 * Get all environment column aliases
 */
export function getAllEnvironmentColumnAliases(): EnvironmentColumnAlias[] {
  return Object.values(ENVIRONMENT_COLUMN_ALIASES);
}

/**
 * Get environment column definition by alias
 */
export function getEnvironmentColumnDefinition(alias: EnvironmentColumnAlias) {
  return ENVIRONMENT_COLUMN_DEFINITIONS[alias];
}

/**
 * Generate expected formula for an environment column
 */
export function getExpectedFormula(alias: EnvironmentColumnAlias, auth: HnyTricksAuthorization): string {
  const definition = getEnvironmentColumnDefinition(alias);
  return definition.formulaGenerator(auth);
}

/**
 * Check if user has permissions to manage environment columns
 */
export function canManageEnvironmentColumns(auth: HnyTricksAuthorization): boolean {
  return auth.permissions.canManageColumns;
}