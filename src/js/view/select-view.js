import {createElement} from '../render.js';

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
    ${isMultiple ? 'aria-multiselectable="true"' : `aria-expanded="${(isOpened).toString()}" aria-controls="select-datalist-${id}"`}
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

export default class SelectView {
  #select = null;
  #element = null;

  constructor({select}) {
    this.#select = select;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSelectTemplate(this.#select);
  }

  removeElement() {
    this.#element = null;
  }
}
