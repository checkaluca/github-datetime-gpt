import { useEffect } from "react";
import "./style.css";

const enhanceRelativeTime = () => {
  document.querySelectorAll("relative-time").forEach((element) => {
    if (!element.dataset.absoluteAdded) {
      const datetime = element.getAttribute("datetime");
      if (datetime) {
        const absoluteTime = new Date(datetime).toLocaleString();
        const absoluteSpan = document.createElement("span");
        absoluteSpan.textContent = ` (${absoluteTime})`;
        absoluteSpan.classList.add("absolute-time");

        element.parentNode.insertBefore(absoluteSpan, element.nextSibling);
        element.dataset.absoluteAdded = "true";
      }
    }
  });
};

const PlasmoOverlay = () => {
  useEffect(() => {
    const observer = new MutationObserver(enhanceRelativeTime);
    observer.observe(document.body, { childList: true, subtree: true });
    enhanceRelativeTime();
    return () => observer.disconnect();
  }, []);

  return null;
};

export default PlasmoOverlay;
