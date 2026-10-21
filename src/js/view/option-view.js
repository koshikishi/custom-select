import AbstractView from '../framework/view/abstract-view.js';

const createOptionTemplate = (option) => {
  const {id, index, label, isSelected, isDisabled} = option;

  const selectedClassName = isSelected ? 'custom-select__option--selected' : '';
  const disabledClassName = isDisabled ? 'custom-select__option--disabled' : '';

  return `<li
    class="custom-select__option ${selectedClassName} ${disabledClassName}"
    id="${id}"
    data-index="${index}"
    role="option"
    ${isDisabled ? 'aria-disabled="true"' : 'tabindex="-1"'}
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
    if (this.#option === update) {
      return;
    }

    this.#option = update;

    const prevElement = this.element;

    this.removeElement();

    const newElement = this.element;

    prevElement.replaceWith(newElement);
  }
}
