export default class View {
  $ = {};

  constructor() {
    this.$.menu = this.#qs(`[data-id="menu"]`);
    this.$.menuBtn = this.#qs(`[data-id="menu-btn"]`);
    this.$.menuItems = this.#qs(`[data-id="menu-items"]`);
    this.$.resetBtn = this.#qs(`[data-id="reset-btn"]`);
    this.$.newRoundBtn = this.#qs(`[data-id="new-round-btn"]`);
    this.$.squares = this.#qsAll(`[data-id="square"]`);
    this.$.turnIcon = this.#qs("div.turn > i");
    this.$.turnText = this.#qs("div.turn > p");
    this.$.modal = this.#qs(`[data-id="modal"]`);
    this.$.modalText = this.#qs(`[data-id="modal-text"]`);
    this.$.modalBtn = this.#qs(`[data-id="modal-btn"]`);

    // UI-only event listeners
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenuHelper();
    });
  }

  // Register all the event listeners

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$.squares.forEach((square) => {
      square.addEventListener("click", handler);
    });
  }

  // Dom Helper Methods

  #toggleMenuHelper() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");

    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) {
      throw new Error(`Element ${selector} cannot be found.`);
    }

    return el;
  }
  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) {
      throw new Error(`Element ${selector} cannot be found.`);
    }

    return elList;
  }
}
