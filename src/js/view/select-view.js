import {nanoid} from 'nanoid';
import AbstractView from '../framework/view/abstract-view.js';

const createSelectTemplate = (select) => {
  const {
    id,
    options,
    activeDescendant,
    classList,
    tabIndex,
    isOpened,
    isMultiple,
    isDisabled,
    isRequired,
  } = select;
  const dataListId = `select-datalist-${nanoid()}`;

  const openedClassName = isOpened ? 'custom-select--opened' : '';
  const multipleClassName = isMultiple ? 'custom-select--multiple' : '';
  const disabledClassName = isDisabled ? 'custom-select--disabled' : '';
  const requiredClassName = isRequired ? 'custom-select--required' : '';

  return `<div
    class="custom-select ${classList.join(' ')} ${openedClassName} ${multipleClassName} ${disabledClassName} ${requiredClassName}"
    role="${isMultiple ? 'listbox' : 'combobox'}"
    ${isDisabled ? 'aria-disabled="true"' : `tabindex="${tabIndex}"`}
    ${isMultiple ? 'aria-multiselectable="true"' : `aria-expanded="${String(isOpened)}" aria-controls="${dataListId}"`}
    ${isRequired ? 'aria-required="true"' : ''}
    ${(activeDescendant && (isMultiple || isOpened)) ? `aria-activedescendant="${activeDescendant.id}"` : ''}
    aria-labelledby="${id}"
  >
    ${isMultiple ? '' : `<div class="custom-select__header">
      <div class="custom-select__header-label">${activeDescendant?.label ?? options[0].label}</div>
    </div>`}
    <ul class="custom-select__datalist" id="${dataListId}" role="${isMultiple ? 'none' : 'listbox'}"></ul>
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

    this.element.setAttribute('aria-activedescendant', `${update.activeDescendant.id}`);

    if (!this.#select.isMultiple) {
      const headerLabelElement = this.element.querySelector('.custom-select__header-label');

      headerLabelElement.textContent = update.activeDescendant.label;
    }
  }
}
