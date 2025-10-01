import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";

type QueryDefinition = {
  id: string;
  calculations?: Array<{
    op: string;
    column?: string;
  }>;
  filters?: Array<{
    column: string;
    op: string;
    value?: any;
  }>;
  breakdowns?: string[];
  orders?: Array<{
    column?: string;
    op?: string;
    order?: string;
  }>;
  havings?: Array<{
    calculate_op: string;
    column?: string;
    op: string;
    value?: any;
  }>;
  time_range?: number;
  granularity?: number;
  limit?: number;
};

type Panel = {
  type: string;
  position?: {
    x_coordinate: number;
    y_coordinate: number;
    height: number;
    width: number;
  };
  query_panel?: {
    query_id: string;
    query_annotation_id?: string;
    visualization_settings?: object;
    query_style?: string;
    dataset: string;
  };
};

type BoardDetails = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  panels?: Panel[];
};

export async function analyzeBoard(
  auth: HnyTricksAuthorization,
  boardId: string
): Promise<Html> {
  const response = await fetchFromHoneycombApi<BoardDetails>(
    {
      apiKey: auth.apiKey,
      keyInfo: auth.keyInfo,
      method: "GET",
    },
    `boards/${boardId}`
  );

  if (isFetchError(response)) {
    return html`<div class="unhappy" data-traceid="${currentTraceId()}">
      ⚠️ Error fetching board details: ${response.message}
    </div>`;
  }

  // Fetch query definitions for all query panels
  const panels = response.panels || [];
  const queryPanels = panels.filter((p) => p.type === "query" && p.query_panel);

  const queriesWithDefs = await Promise.all(
    queryPanels.map(async (panel) => {
      const queryPanel = panel.query_panel!;
      const queryDef = await fetchFromHoneycombApi<QueryDefinition>(
        {
          apiKey: auth.apiKey,
          keyInfo: auth.keyInfo,
          method: "GET",
        },
        `queries/${queryPanel.dataset}/${queryPanel.query_id}`
      );

      return {
        panel,
        queryDef: isFetchError(queryDef) ? null : queryDef,
        error: isFetchError(queryDef) ? queryDef : null,
      };
    })
  );

  return html`<div class="board-analysis-content" data-traceid="${currentTraceId()}">
    <h4>Board: ${response.name}</h4>
    ${response.description ? html`<p>${response.description}</p>` : ""}
    ${renderPanels(queriesWithDefs)}
  </div>`;
}

function renderPanels(
  queriesWithDefs: Array<{
    panel: Panel;
    queryDef: QueryDefinition | null;
    error: any;
  }>
): Html {
  if (queriesWithDefs.length === 0) {
    return html`<p>No query panels found on this board.</p>`;
  }

  return html`<div class="queries-section">
    <h5>Query Panels (${queriesWithDefs.length})</h5>
    <ul class="queries-list">
      ${queriesWithDefs.map((item, idx) => renderQueryPanel(item, idx))}
    </ul>
  </div>`;
}

function renderQueryPanel(
  item: {
    panel: Panel;
    queryDef: QueryDefinition | null;
    error: any;
  },
  index: number
): Html {
  const queryPanel = item.panel.query_panel!;
  const caption = `Query ${index + 1} (${queryPanel.dataset})`;

  if (item.error) {
    return html`<li class="query-item">
      <strong>${caption}</strong>
      <div class="unhappy">⚠️ Error fetching query: ${item.error.message}</div>
    </li>`;
  }

  if (!item.queryDef) {
    return html`<li class="query-item">
      <strong>${caption}</strong>
      <div class="query-detail">No query definition available</div>
    </li>`;
  }

  return html`<li class="query-item">
    <details>
      <summary><strong>${caption}</strong></summary>
      <div class="query-details">
        <div class="query-section">
          <strong>Query ID:</strong> ${queryPanel.query_id}
        </div>
        <div class="query-section">
          <strong>Dataset:</strong> ${queryPanel.dataset}
        </div>
        ${renderCalculations(item.queryDef.calculations)}
        ${renderBreakdowns(item.queryDef.breakdowns)}
        ${renderFilters(item.queryDef.filters)}
        ${renderOrders(item.queryDef.orders)}
        ${renderHavings(item.queryDef.havings)}
        ${renderTimeRange(item.queryDef.time_range)}
        ${renderLimit(item.queryDef.limit)}
      </div>
    </details>
  </li>`;
}

function renderCalculations(calculations?: Array<{ op: string; column?: string }>): Html {
  if (!calculations || calculations.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Calculations:</strong>
    <ul>
      ${calculations.map((calc) => html`<li>${calc.op}${calc.column ? `(${calc.column})` : ""}</li>`)}
    </ul>
  </div>`;
}

function renderBreakdowns(breakdowns?: string[]): Html {
  if (!breakdowns || breakdowns.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Breakdowns:</strong> ${breakdowns.join(", ")}
  </div>`;
}

function renderFilters(filters?: Array<{ column: string; op: string; value?: any }>): Html {
  if (!filters || filters.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Filters:</strong>
    <ul>
      ${filters.map((filter) => {
        const valueStr = filter.value !== undefined ? ` ${JSON.stringify(filter.value)}` : "";
        return html`<li>${filter.column} ${filter.op}${valueStr}</li>`;
      })}
    </ul>
  </div>`;
}

function renderOrders(orders?: Array<{ column?: string; op?: string; order?: string }>): Html {
  if (!orders || orders.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Order:</strong>
    <ul>
      ${orders.map((order) => html`<li>${order.column || order.op} ${order.order || ""}</li>`)}
    </ul>
  </div>`;
}

function renderHavings(havings?: Array<{ calculate_op: string; column?: string; op: string; value?: any }>): Html {
  if (!havings || havings.length === 0) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Having:</strong>
    <ul>
      ${havings.map((having) => html`<li>${having.calculate_op}${having.column ? `(${having.column})` : ""} ${having.op} ${JSON.stringify(having.value)}</li>`)}
    </ul>
  </div>`;
}

function renderTimeRange(timeRange?: number): Html {
  if (!timeRange) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Time range:</strong> ${timeRange} seconds
  </div>`;
}

function renderLimit(limit?: number): Html {
  if (!limit) {
    return html``;
  }
  return html`<div class="query-section">
    <strong>Limit:</strong> ${limit}
  </div>`;
}
