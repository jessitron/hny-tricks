import { startingApiKeyPrompt } from "./ApiKeyPrompt";
import { html } from "./htm-but-right";
import { currentTraceId } from "./tracing-util";

/**
 * I wanted to pull out the html for the main page, and make it more isolated and clear,
 * not buried in Express code.
 *
 * This way it's like app.tsx or something
 */

export function index() {
  return html`<html>
    <head>
      <script src="/hny.js"></script>
      <script
        dangerouslySetInnerHTML=${{ __html: javascriptToStartTracing }}
      ></script>
      <script src="/htmx.js"></script>
      <title>Hny Tricks</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body data-traceid="${currentTraceId()}">
      <header>
        <a href="/">
          <img class="icon" id="hny-heart" src="./honeycomb-heart.png" />
        </a>
        <span class="title">Jessitron's Honeycomb Tricks</span>
        <a href="https://github.com/jessitron/hny-tricks">
          <img class="icon" id="github-logo" src="./github-mark.svg" />
        </a>
      </header>
      <main>
        <div class="hero">
          <img
            id="hero-image"
            src="./bug-thinks-nuggs.jpg"
            alt="extremely arbitrary image"
          />
          <div>
            <h1>🪩 Welcome 🪩</h1>
            <p>
              Have a ${" "}<a href="https://honeycomb.io">Honeycomb.io</a>${" "}
              API key, and want to know where it goes? This app will call the
              Honeycomb Auth endpoint to find out.
            </p>
            <p>
              Use at your own risk. Honeycomb does not publish or support this
              app. I won't save your API key, but this deployment is not
              particularly secure. To use this app on production data, ${" "}
              <a href="https://github.com/jessitron/hny-tricks" target="_blank"
                >clone it</a
              >${" "} and run it yourself.
            </p>
          </div>
        </div>
        <div id="stuff">${startingApiKeyPrompt}</div>
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
          debug: true,
        });
`;

const SneakyFooter = () =>
  html`<footer>
    <img id="bug" src="./bug-thinks-nuggs.jpg" />
  </footer>`;
