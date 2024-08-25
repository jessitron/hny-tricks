// Example filename: tracing.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ExpressLayerType } from "@opentelemetry/instrumentation-express";

const sdk: NodeSDK = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      // We recommend disabling fs automatic instrumentation because
      // it can be noisy and expensive during startup
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
      "@opentelemetry/instrumentation-express": {
        ignoreLayersType: [ExpressLayerType.MIDDLEWARE],
      },
    }),
  ],
});

sdk.start();
