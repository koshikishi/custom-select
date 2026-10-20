import AbstractView from '../framework/view/abstract-view.js';

const createSelectTemplate = (select) => {
  const {
    id,
    lastSelectedOption,
    lastFocusedOption,
    classList,
    tabIndex,
    isOpened,
    isMultiple,
    isDisabled,
    isRequired,
  } = select;

  const openedClassName = isOpened ? 'custom-select--opened' : '';
  const multipleClassName = isMultiple ? 'custom-select--multiple' : '';
  const disabledClassName = isDisabled ? 'custom-select--disabled' : '';
  const requiredClassName = isRequired ? 'custom-select--required' : '';

  return `<div
    class="custom-select ${classList.join(' ')} ${openedClassName} ${multipleClassName} ${disabledClassName} ${requiredClassName}"
    role="${isMultiple ? 'listbox' : 'combobox'}"
    ${isDisabled ? 'aria-disabled="true"' : `tabindex="${tabIndex}"`}
    ${isMultiple ? 'aria-multiselectable="true"' : `aria-expanded="${String(isOpened)}" aria-controls="select-datalist-${id}"`}
    ${isRequired ? 'aria-required="true"' : ''}
    ${lastFocusedOption && (isMultiple || isOpened) ? `aria-activedescendant="select-option-${lastFocusedOption.id}"` : ''}
    aria-labelledby="custom-select-${id}"
  >
    ${isMultiple ? '' : `<div class="custom-select__header">
      <div class="custom-select__header-label">${lastSelectedOption?.label ?? ''}</div>
    </div>`}
    <ul class="custom-select__datalist" id="select-datalist-${id}" tabindex="-1" role="${isMultiple ? 'none' : 'listbox'}"></ul>
  </div>`;
};

export default class SelectView extends AbstractView {
  #select = null;
  #handleClick = null;

  constructor({select, onClick}) {
    super();
    this.#select = select;
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createSelectTemplate(this.#select);
  }

  #clickHandler = (evt) => {
    this.#handleClick(evt);
  };

  updateElement(update) {
    this.#select = update;

    this.element.setAttribute('aria-activedescendant', `select-option-${update.lastFocusedOption.id}`);

    if (!this.#select.isMultiple) {
      const headerLabelElement = this.element.querySelector('.custom-select__header-label');

      headerLabelElement.textContent = update.lastSelectedOption.label;
    }
  }
}
