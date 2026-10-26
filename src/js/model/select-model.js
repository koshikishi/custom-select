import Observable from '../framework/observable.js';

export default class SelectModel extends Observable {
  #selectAdapter = null;
  #select = null;

  constructor({selectAdapter}) {
    super();
    this.#selectAdapter = selectAdapter;
    this.#select = selectAdapter.select;
  }

  get select() {
    return this.#select;
  }

  setSelected(updateType, eventType, {selectedOptions, activeDescendant, selectedIndex}) {
    this.#selectAdapter.setSelected(Array.from(selectedOptions));
    this.#select.options.forEach((option) => this.#toggleOption(option, selectedOptions.has(option)));

    this.#select.selectedIndex = selectedIndex;
    this.#select.activeDescendant = activeDescendant;

    this._notify(updateType, eventType, this.#select);
  }

  toggleSelect(updateType, eventType, force) {
    this.#select.isOpened = force ?? !this.#select.isOpened;

    this._notify(updateType, eventType, this.#select);
  }

  #toggleOption(option, force) {
    if (option.isDisabled || option.isSelected === force) {
      return;
    }

    const updatedOption = {...option, isSelected: !option.isSelected};

    this.#select.options[option.index] = updatedOption;

    if (this.#select.selectedOptions.has(option)) {
      this.#select.selectedOptions.delete(option);
    } else {
      this.#select.selectedOptions.add(updatedOption);
    }
  }
}
