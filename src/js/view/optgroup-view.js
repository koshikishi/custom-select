import {createElement} from '../render.js';

const createOptGroupTemplate = () =>
  `<li class="custom-select__optgroup" role="group" aria-labelledby="select-optgroup-rnd303">
    <div class="custom-select__optgroup-label" id="select-optgroup-rnd303" aria-hidden="true">Cats</div>
    <ul class="custom-select__optgroup-list" role="none"></ul>
  </li>`;

export default class OptGroupView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createOptGroupTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
