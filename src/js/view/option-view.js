import AbstractView from '../framework/view/abstract-view.js';

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

export default class OptionView extends AbstractView {
  #option = null;

  constructor({option}) {
    super();
    this.#option = option;
  }

  get template() {
    return createOptionTemplate(this.#option);
  }
}
