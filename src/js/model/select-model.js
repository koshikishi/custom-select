import Observable from '../framework/observable.js';
import {mockSelect} from '../mock/select.js';

export default class SelectModel extends Observable {
  #select = mockSelect;

  get select() {
    return this.#select;
  }

  setSelected(updateType, {selectedOptions, activeDescendant, selectedIndex}) {
    this.#select.options.forEach((option) => this.#toggleOption(option, selectedOptions.has(option)));

    this.#select.selectedIndex = selectedIndex;
    this.#select.activeDescendant = activeDescendant;

    this._notify(updateType, this.#select);
  }

  toggleSelect(updateType, force) {
    this.#select.isOpened = force ?? !this.#select.isOpened;

    this._notify(updateType, this.#select);
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
