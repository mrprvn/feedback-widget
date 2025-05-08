import ReactDOM from "react-dom/client";
import FeedbackWidget from "./components/FeedbackWidget";
import tailwindCSS from "./index.css?inline"; // Tailwind compiled CSS as string

class FeedbackWebComponent extends HTMLElement {
  projectId: number;
  websiteName: string;
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.projectId = Number(this.getAttribute("projectId"));
    this.websiteName = this.getAttribute("websiteName") || "";
  }

  connectedCallback() {
    // Create <style> with Tailwind styles
    const style = document.createElement("style");
    style.textContent = tailwindCSS;

    // Create div for mounting React app
    const root = document.createElement("div");
    root.setAttribute("id", "feedback-root");

    this.shadow.appendChild(style);
    this.shadow.appendChild(root);

    // Render React component inside Shadow DOM
    ReactDOM.createRoot(root).render(
      <FeedbackWidget
        projectId={this.projectId}
        websiteName={this.websiteName}
      />
    );
  }
}

customElements.define("feedback-widget", FeedbackWebComponent);
