import { Attributes, context, Span, trace } from "@opentelemetry/api";
import {
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE,
} from "@opentelemetry/semantic-conventions";

const REPORT_ATTRIBUTES_TO_CONSOLE = false;
const REPORT_SPAN_EVENTS_TO_CONSOLE = true;

export function report(attributes: Attributes) {
  trace.getActiveSpan()?.setAttributes(attributes);
  if (REPORT_ATTRIBUTES_TO_CONSOLE) {
    console.log(JSON.stringify(attributes, null, 2));
  }
}

export function reportAsSpanEvent(name: string, attributes: Attributes) {
  trace.getActiveSpan()?.addEvent(name, attributes);
  if (REPORT_SPAN_EVENTS_TO_CONSOLE) {
    console.log(name + ": " + JSON.stringify(attributes, null, 2));
  }
}
export function recordError(error: any, attributes?: Attributes) {
  recordException(error, attributes);
  if (REPORT_ATTRIBUTES_TO_CONSOLE) {
    if (error.printStackTrace) {
      error.printStackTrace();
    } else {
      console.log(error);
    }
    console.log(JSON.stringify(attributes, null, 2));
  }
}

/**
 * Do Things Right - copy of recordException that accepts more attributes.
 * @param exception
 * @param additionalAttributes
 */
function recordException(exception, additionalAttributes) {
  const span = trace.getActiveSpan();

  // I took this from the sdk-trace-base, except I'm gonna support additional attributes.
  // https://github.com/open-telemetry/opentelemetry-js/blob/90afa2850c0690f7a18ecc511c04927a3183490b/packages/opentelemetry-sdk-trace-base/src/Span.ts#L321
  const attributes = {};
  if (typeof exception === "string") {
    attributes[ATTR_EXCEPTION_MESSAGE] = exception;
  } else if (exception) {
    if (exception.code) {
      attributes[ATTR_EXCEPTION_TYPE] = exception.code.toString();
    } else if (exception.name) {
      attributes[ATTR_EXCEPTION_TYPE] = exception.name;
    }
    if (exception.message) {
      attributes[ATTR_EXCEPTION_MESSAGE] = exception.message;
    }
    if (exception.stack) {
      attributes[ATTR_EXCEPTION_STACKTRACE] = exception.stack;
    }
  }
  const allAttributes = { ...attributes, ...additionalAttributes };
  span.addEvent("exception", allAttributes);
  span.setStatus({
    code: 2, // SpanStatusCode.ERROR,
    message: attributes[ATTR_EXCEPTION_MESSAGE],
  });
}

export function inSpan(spanName, fn) {
  if (fn === undefined) {
    console.log("USAGE: inSpan(tracerName, spanName, () => { ... })");
  }
  return trace.getTracer("hny-tricks").startActiveSpan(spanName, (span) => {
    try {
      return fn();
    } catch (err) {
      span.setStatus({
        code: 2, //SpanStatusCode.ERROR,
        message: err.message,
      });
      span.recordException(err);
      throw err;
    } finally {
      span.end();
    }
  });
}

export async function inSpanAsync<T>(
  spanName,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  if (fn === undefined) {
    console.log("USAGE: inSpanAsync(spanName, async () => { ... })");
  }
  return trace
    .getTracer("hny-tricks")
    .startActiveSpan(spanName, async (span) => {
      try {
        return await fn(span);
      } catch (err) {
        span.setStatus({
          code: 2, // trace.SpanStatusCode.ERROR,
          message: err.message,
        });
        span.recordException(err);
        throw err;
      } finally {
        span.end();
      }
    });
}

export function currentTraceId() {
  return trace.getSpanContext(context.active())?.traceId;
}
