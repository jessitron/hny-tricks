import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";

type QuerySpec = {
  caption?: string;
  graph_settings?: object;
  query_id?: string;
  query_style?: string;
  query?: {
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
  };
};

type BoardDetails = {
  id: string;
  name: string;
  description?: string;
  column_layout?: string;
  style?: string;
  queries?: QuerySpec[];
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

  return html`<div class="board-analysis-content" data-traceid="${currentTraceId()}">
    <h4>Board: ${response.name}</h4>
    ${response.description ? html`<p>${response.description}</p>` : ""}
    ${renderQueries(response.queries || [])}
  </div>`;
}

function renderQueries(queries: QuerySpec[]): Html {
  if (queries.length === 0) {
    return html`<p>No queries found on this board.</p>`;
  }

  return html`<div class="queries-section">
    <h5>Queries (${queries.length})</h5>
    <ul class="queries-list">
      ${queries.map((q, idx) => renderQuery(q, idx))}
    </ul>
  </div>`;
}

function renderQuery(querySpec: QuerySpec, index: number): Html {
  const caption = querySpec.caption || `Query ${index + 1}`;
  const query = querySpec.query;

  if (!query) {
    return html`<li class="query-item">
      <strong>${caption}</strong>
      <div class="query-detail">No query definition available</div>
    </li>`;
  }

  return html`<li class="query-item">
    <details>
      <summary><strong>${caption}</strong></summary>
      <div class="query-details">
        ${renderCalculations(query.calculations)}
        ${renderBreakdowns(query.breakdowns)}
        ${renderFilters(query.filters)}
        ${renderOrders(query.orders)}
        ${renderHavings(query.havings)}
        ${renderTimeRange(query.time_range)}
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
      ${filters.map((filter) => html`<li>${filter.column} ${filter.op} ${JSON.stringify(filter.value)}</li>`)}
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
