import { fetchFromHoneycombApi, isFetchError } from "../HoneycombApi";
import { HnyTricksAuthorization } from "../common";
import { Html, html } from "../htm-but-right";
import { currentTraceId } from "../tracing-util";

type Board = {
  id: string;
  name: string;
  description?: string;
  style?: string;
};

type ListBoardsResponse = Board[];

export async function listBoards(auth: HnyTricksAuthorization): Promise<Html> {
  const response = await fetchFromHoneycombApi<ListBoardsResponse>(
    {
      apiKey: auth.apiKey,
      keyInfo: auth.keyInfo,
      method: "GET",
    },
    "boards"
  );

  if (isFetchError(response)) {
    return html`<div class="unhappy" data-traceid="${currentTraceId()}">
      ⚠️ Error fetching boards: ${response.message}
    </div>`;
  }

  if (response.length === 0) {
    return html`<div data-traceid="${currentTraceId()}">
      No boards found in this environment.
    </div>`;
  }

  return html`<div data-traceid="${currentTraceId()}">
    <h3>Boards in ${auth.environment.name || "Classic"}</h3>
    <ul class="board-list">
      ${response.map((board) => BoardItem(board))}
    </ul>
  </div>`;
}

function BoardItem(board: Board): Html {
  return html`<li class="board-item">
    <div class="board-info">
      <strong>${board.name}</strong>
      ${board.description ? html`<span class="board-description"> - ${board.description}</span>` : ""}
    </div>
    <button
      class="copy-button"
      hx-post="/copy-board/analyze-board"
      hx-target="#board-analysis-${board.id}"
      hx-vals='{"board-id": "${board.id}"}'
      hx-include="#from-apikey"
      hx-swap="innerHTML"
      hx-indicator="#big-think"
    >
      Copy
    </button>
    <div id="board-analysis-${board.id}" class="board-analysis"></div>
  </li>`;
}
