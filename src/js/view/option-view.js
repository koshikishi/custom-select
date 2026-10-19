import {createElement} from '../framework/render.js';

const createOptionTemplate = (option) => {
  const {id, label, isSelected, isDisabled} = option;

  const selectedClassName = isSelected ? 'custom-select__option--selected' : '';
  const disabledClassName = isDisabled ? 'custom-select__option--disabled' : '';

  return `<li
    class="custom-select__option ${selectedClassName} ${disabledClassName}"
    id="select-option-${id}"
    role="option"
    ${isDisabled ? 'aria-disabled="true"' : 'tabindex="-1"'}
    aria-selected="${isSelected.toString()}"
  >
    <div class="custom-select__option-label">${label}</div>
  </li>`;
};

export default class OptionView {
  #option = null;
  #element = null;

  constructor({option}) {
    this.#option = option;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createOptionTemplate(this.#option);
  }

  removeElement() {
    this.#element = null;
  }
}
