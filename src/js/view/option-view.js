import AbstractView from '../framework/view/abstract-view.js';

const createOptionTemplate = (option) => {
  const {id, label, isSelected, isDisabled} = option;

  const selectedClassName = isSelected ? 'custom-select__option--selected' : '';
  const disabledClassName = isDisabled ? 'custom-select__option--disabled' : '';

  return `<li
    class="custom-select__option ${selectedClassName} ${disabledClassName}"
    id="select-option-${id}"
    data-id="${id}"
    role="option"
    ${isDisabled ? 'aria-disabled="true"' : ''}
    aria-selected="${String(isSelected)}"
  >
    <div class="custom-select__option-label">${label}</div>
  </li>`;
};

export default class OptionView extends AbstractView {
  #option = null;

  constructor({option}) {
    super();
    this.#option = option;
  }

  get template() {
    return createOptionTemplate(this.#option);
  }

  updateElement(update) {
    const prevElement = this.element;

    this.removeElement();
    this.#option = update;

    const newElement = this.element;

    prevElement.replaceWith(newElement);
  }
}
