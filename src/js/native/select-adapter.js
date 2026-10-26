import {nanoid} from 'nanoid';

export default class SelectAdapter {
  #origin = null;

  #select = null;
  #optGroups = new Map();
  #options = new Map();

  constructor(origin) {
    if (!(origin instanceof HTMLSelectElement)) {
      throw new TypeError(`Expected HTMLSelectElement, got ${origin.constructor.name} instead`);
    }

    this.#origin = origin;
  }

  get select() {
    if (!this.#select) {
      this.#select = this.#adaptSelect(this.#origin);
    }

    return this.#select;
  }

  setSelected(options) {
    Array.prototype.forEach.call(this.#origin.options, (option) => {
      if (option.disabled) {
        return;
      }

      option.selected = options.find(({index}) => index === option.index) ?? false;
    });
  }

  #adaptOption(option, isDisabled = false) {
    const adaptedOption = {};
    const optGroup = option.parentElement instanceof HTMLOptGroupElement ? this.#adaptOptGroup(option.parentElement, isDisabled) : null;

    adaptedOption.id = `select-option-${nanoid()}`;
    adaptedOption.index = option.index;
    adaptedOption.optGroup = optGroup;
    adaptedOption.label = option.label;
    adaptedOption.isSelected = option.selected;
    adaptedOption.isDisabled = option.disabled || optGroup?.isDisabled || isDisabled;
    adaptedOption.title = option.title;
    adaptedOption.isTranslatable = option.translate;
    adaptedOption.lang = option.lang;
    adaptedOption.dir = option.dir;

    this.#options.set(option, adaptedOption);

    return adaptedOption;
  }

  #adaptOptGroup(optGroup, isDisabled = false) {
    if (this.#optGroups.has(optGroup)) {
      return this.#optGroups.get(optGroup);
    }

    const adaptedOptGroup = {};

    adaptedOptGroup.id = `select-optgroup-${nanoid()}`;
    adaptedOptGroup.label = optGroup.label;
    adaptedOptGroup.isDisabled = optGroup.disabled || isDisabled;
    adaptedOptGroup.title = optGroup.title;
    adaptedOptGroup.isTranslatable = optGroup.translate;
    adaptedOptGroup.lang = optGroup.lang;
    adaptedOptGroup.dir = optGroup.dir;

    this.#optGroups.set(optGroup, adaptedOptGroup);

    return adaptedOptGroup;
  }

  #adaptSelect(select) {
    const adaptedSelect = {};

    adaptedSelect.id = `custom-select-${nanoid()}`;
    adaptedSelect.options = Array.prototype.map.call(select.options, (option) => this.#adaptOption(option, select.disabled));
    adaptedSelect.selectedOptions = new Set(adaptedSelect.options.filter(({isSelected}) => isSelected));
    adaptedSelect.selectedIndex = select.selectedIndex;
    adaptedSelect.activeDescendant = (adaptedSelect.selectedIndex === -1) ? null : adaptedSelect.options[adaptedSelect.selectedIndex];
    adaptedSelect.classList = Array.from(select.classList);
    adaptedSelect.style = select.style.cssText;
    adaptedSelect.size = select.size;
    adaptedSelect.labels = select.labels;
    adaptedSelect.isOpened = false;
    adaptedSelect.isMultiple = select.multiple;
    adaptedSelect.isDisabled = select.disabled;
    adaptedSelect.isRequired = select.required;
    adaptedSelect.title = select.title;
    adaptedSelect.isTranslatable = select.translate;
    adaptedSelect.lang = select.lang;
    adaptedSelect.dir = select.dir;
    adaptedSelect.tabIndex = select.tabIndex;
    adaptedSelect.hasAutofocus = select.autofocus;

    return adaptedSelect;
  }
}
