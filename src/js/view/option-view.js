import AbstractView from '../framework/view/abstract-view.js';
import {ClassName} from '../const.js';

const createOptionTemplate = (option) => {
  const {
    id,
    index,
    label,
    title,
    lang,
    dir,
    isSelected,
    isDisabled,
    isTranslatable,
  } = option;

  const selectedClassName = isSelected ? ClassName.OPTION_SELECTED : '';
  const disabledClassName = isDisabled ? ClassName.OPTION_DISABLED : '';

  return `<li
    class="custom-select__option ${selectedClassName} ${disabledClassName}"
    id="${id}"
    ${title ? `title="${title}"` : ''}
    ${lang ? `lang="${lang}"` : ''}
    ${dir ? `dir="${dir}"` : ''}
    ${isTranslatable ? 'translate="yes"' : ''}
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

    this.element.classList.toggle(ClassName.OPTION_SELECTED, update.isSelected);
    this.element.ariaSelected = String(update.isSelected);
  }
}
