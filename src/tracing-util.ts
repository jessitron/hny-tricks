import { trace } from "@opentelemetry/api";

export function inSpan(tracerName, spanName, fn) {
  if (fn === undefined) {
    console.log("USAGE: inSpan(tracerName, spanName, () => { ... })");
  }
  return trace.getTracer(tracerName).startActiveSpan(spanName, (span) => {
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

export async function inSpanAsync(tracerName, spanName, fn) {
  if (fn === undefined) {
    console.log(
      "USAGE: inSpanAsync(tracerName, spanName, async () => { ... })"
    );
  }
  return trace.getTracer(tracerName).startActiveSpan(spanName, async (span) => {
    try {
      return await fn();
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
