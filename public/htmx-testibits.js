/**
 * This is for testing tracing.
 */

// If I add an event listener, does it show up inside the trace?

htmx.on("htmx:afterSwap", (parameters) => {
  console.log("Where are we?", window.Hny.activeSpanContext());
  console.log("This is after a swap", parameters);
});
