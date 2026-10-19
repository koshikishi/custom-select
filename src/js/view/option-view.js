import {createElement} from '../render.js';

const createOptionTemplate = () =>
  `<li class="custom-select__option custom-select__option--selected" id="select-option-rnd103" tabindex="-1" role="option" aria-selected="true">
    <div class="custom-select__option-label">Cat</div>
  </li>`;

export default class OptionView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createOptionTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
