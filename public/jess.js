(() => {
  const elementsOfInterest = document.querySelectorAll("[tron-reveal]");

  elementsOfInterest.forEach((element) => {
    const revealMe = element.getAttribute("tron-reveal");
    // console.log(`Element ${element.id} will reveal ${revealMe} on hover`);
    const revealElement = document.querySelector(revealMe);
    if (!revealElement) {
      console.error(
        `Element ${revealMe} not found, so element ${element.id} will not reveal anything`
      );
      return;
    }
    // check that revealElement is an input
    if (revealElement.tagName !== "INPUT") {
      console.error(
        `Element ${revealMe} is not an input, so element ${element.id} will not reveal anything`
      );
      return;
    }
    // add a hover listener to element
    element.addEventListener("mouseenter", () => {
      revealElement.type = "text";
    });
    element.addEventListener("mouseleave", () => {
      revealElement.type = "password";
    });
  });
})();
