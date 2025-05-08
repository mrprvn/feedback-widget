import ReactDOM from "react-dom/client";
import FeedbackWidget from "./components/FeedbackWidget";
import tailwindCSS from "./index.css?inline";

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
    // Create a container for the entire widget (button + feedback form)
    const container = document.createElement("div");

    // Create the button that triggers the feedback form
    const button = document.createElement("button");
    button.textContent = "Give Feedback";
    button.classList.add(
      "fixed",
      "bottom-4",
      "right-4",
      "bg-primary",
      "text-white",
      "p-4",
      "rounded-full"
    );

    // Create the feedback form container (initially hidden)
    const root = document.createElement("div");
    const style = document.createElement("style");
    style.textContent = tailwindCSS;

    // Append styles and the root div to the Shadow DOM
    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
    container.appendChild(button);
    container.appendChild(root);

    // Toggle feedback form visibility
    let isFormVisible = false;
    button.addEventListener("click", () => {
      isFormVisible = !isFormVisible;
      if (isFormVisible) {
        ReactDOM.createRoot(root).render(
          <FeedbackWidget
            projectId={this.projectId}
            websiteName={this.websiteName}
          />
        );
      } else {
        root.innerHTML = ""; // Clear the form when the button is clicked again
      }
    });
  }
}

customElements.define("feedback-widget", FeedbackWebComponent);
