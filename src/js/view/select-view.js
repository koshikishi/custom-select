import {nanoid} from 'nanoid';
import AbstractView from '../framework/view/abstract-view.js';

const createSelectTemplate = (select) => {
  const {
    options,
    activeDescendant,
    classList,
    style,
    labelIds,
    title,
    lang,
    dir,
    tabIndex,
    isOpened,
    isMultiple,
    isDisabled,
    isRequired,
    isTranslatable,
    hasAutofocus,
  } = select;
  const dataListId = `select-datalist-${nanoid()}`;

  const openedClassName = isOpened ? 'custom-select--opened' : '';
  const multipleClassName = isMultiple ? 'custom-select--multiple' : '';
  const disabledClassName = isDisabled ? 'custom-select--disabled' : '';
  const requiredClassName = isRequired ? 'custom-select--required' : '';

  return `<div
    class="custom-select ${classList.join(' ')} ${openedClassName} ${multipleClassName} ${disabledClassName} ${requiredClassName}"
    ${style ? `style="${style}"` : ''}
    ${title ? `title="${title}"` : ''}
    ${lang ? `lang="${lang}"` : ''}
    ${dir ? `dir="${dir}"` : ''}
    ${isTranslatable ? 'translate="yes"' : ''}
    ${hasAutofocus ? 'autofocus' : ''}
    role="${isMultiple ? 'listbox' : 'combobox'}"
    ${isDisabled ? 'aria-disabled="true"' : `tabindex="${tabIndex}"`}
    ${isMultiple ? 'aria-multiselectable="true"' : `aria-expanded="${String(isOpened)}" aria-controls="${dataListId}"`}
    ${isRequired ? 'aria-required="true"' : ''}
    ${(activeDescendant && (isMultiple || isOpened)) ? `aria-activedescendant="${activeDescendant.id}"` : ''}
    ${labelIds.length ? `aria-labelledby="${labelIds.join(' ')}"` : ''}
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
  #handleKeyDown = null;
  #handleFocusOut = null;

  constructor({select, onClick, onKeyDown, onFocusOut}) {
    super();
    this.#select = select;
    this.#handleClick = onClick;
    this.#handleKeyDown = onKeyDown;
    this.#handleFocusOut = onFocusOut;

    this.element.addEventListener('click', this.#clickHandler);
    this.element.addEventListener('keydown', this.#keyDownHandler);
    this.element.addEventListener('focusout', this.#focusOutHandler);
  }

  get template() {
    return createSelectTemplate(this.#select);
  }

  #clickHandler = (evt) => {
    this.#handleClick(evt);
  };

  #keyDownHandler = (evt) => {
    this.#handleKeyDown(evt);
  };

  #focusOutHandler = (evt) => {
    this.#handleFocusOut(evt);
  };

  updateElement(update) {
    this.#select = update;

    this.element.setAttribute('aria-activedescendant', (update.isOpened || update.isMultiple) ? update.activeDescendant.id : '');

    if (!this.#select.isMultiple) {
      const headerLabelElement = this.element.querySelector('.custom-select__header-label');

      this.element.classList.toggle('custom-select--opened', update.isOpened);
      headerLabelElement.textContent = update.activeDescendant.label;
    }
  }
}
