import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

export function copyBoardPage() {
  return html`<html>
    <head>
      <script src="/hny.js"></script>
      <script
        dangerouslySetInnerHTML=${{ __html: javascriptToStartTracing }}
      ></script>
      <script src="/htmx.js"></script>
      <title>Copy Honeycomb Board</title>
      <link rel="stylesheet" href="styles.css" />
      <link rel="icon" type="image/png" href="/honeycomb-heart.png" />
    </head>
    <body data-traceid="${currentTraceId()}">
      <header>
        <a href="/">
          <img class="icon" id="hny-heart" src="./honeycomb-heart.png" />
        </a>
        <span class="title">Copy Honeycomb Board</span>
        <a href="https://github.com/jessitron/hny-tricks">
          <img class="icon" id="github-logo" src="./github-mark.svg" />
        </a>
      </header>
      <main>
        <div class="hero">
          <div>
            <h1>Copy a Board Between Environments</h1>
            <p>
              This tool will help you copy a Honeycomb board from one environment to another.
            </p>
          </div>
        </div>
        <div id="stuff">
          <p>Coming soon: Board copying functionality</p>
        </div>
        <div id="big-think" class="htmx-indicator">
          <img src="./spin.gif" />
        </div>
      </main>
      <${SneakyFooter} />
    </body>
  </html>`;
}

const javascriptToStartTracing = `
   Hny.initializeTracing({  apiKey: "${
     process.env.HONEYCOMB_INGEST_API_KEY || process.env.HONEYCOMB_API_KEY
   }",
          serviceName: "hny-tricks-web",
          debug: false,
          provideOneLinkToHoneycomb: true,
        });
`;

const SneakyFooter = () =>
  html`<footer>
    <img id="bug" src="./bug-thinks-nuggs.jpg" />
  </footer>`;
