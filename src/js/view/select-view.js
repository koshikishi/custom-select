import {createElement} from '../render.js';

const createSelectTemplate = () =>
  `<div
    class="custom-select"
    tabindex="0"
    role="combobox"
    aria-disabled="false"
    aria-expanded="false"
    aria-required="false"
    aria-activedescendant=""
    aria-controls="select-datalist-rnd102"
    aria-labelledby="custom-select-rnd101"
  >
    <div class="custom-select__header">
      <div class="custom-select__header-label">Cat</div>
    </div>
    <ul class="custom-select__datalist" id="select-datalist-rnd102" tabindex="-1" role="listbox"></ul>
  </div>`;

export default class SelectView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSelectTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
