import {createElement} from '../render.js';

export default class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Cannot instantiate AbstractView');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }
}
