import Observable from '../framework/observable.js';
import {EventType} from '../const.js';

export default class SelectModel extends Observable {
  #selectAdapter = null;
  #select = null;

  constructor({selectAdapter}) {
    super();
    this.#selectAdapter = selectAdapter;
    this.#select = selectAdapter.select;
  }

  get origin() {
    return this.#selectAdapter.origin;
  }

  get select() {
    return this.#select;
  }

  setSelected(updateType, eventType, {selectedOptions, activeDescendant, selectedIndex}) {
    if (eventType !== EventType.RESET) {
      this.#selectAdapter.setSelected(Array.from(selectedOptions));
    }

    this.#select.options.forEach((option) => this.#toggleOption(option, selectedOptions.has(option)));

    this.#select.selectedIndex = selectedIndex;
    this.#select.activeDescendant = activeDescendant;
    this.#select.isInvalid = false;

    this._notify(updateType, eventType, this.#select);
  }

  toggleSelect(updateType, eventType, force) {
    this.#select.isOpened = force ?? !this.#select.isOpened;

    this._notify(updateType, eventType, this.#select);
  }

  setValidity(updateType, eventType, isInvalid) {
    this.#select.isInvalid = isInvalid;

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
