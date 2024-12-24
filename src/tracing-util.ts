import { Attributes, context, trace } from "@opentelemetry/api";

const REPORT_ATTRIBUTES_TO_CONSOLE = true;

export function report(attributes: Attributes) {
  trace.getActiveSpan()?.setAttributes(attributes);
  if (REPORT_ATTRIBUTES_TO_CONSOLE) {
    console.log(JSON.stringify(attributes, null, 2));
  }
}

export function recordError(error: any, attributes?: Attributes) {
  trace.getActiveSpan().recordException(error);
  if (REPORT_ATTRIBUTES_TO_CONSOLE) {
    if (error.printStackTrace) {
      error.printStackTrace();
    } else {
      console.log(error);
    }
    console.log(JSON.stringify(attributes, null, 2));
  }
}

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

export function currentTraceId() {
  return trace.getSpanContext(context.active()).traceId;
}
