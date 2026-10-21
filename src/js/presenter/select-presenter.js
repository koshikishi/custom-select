import {render, remove} from '../framework/render.js';
import SelectView from '../view/select-view.js';
import OptGroupView from '../view/optgroup-view.js';
import OptionView from '../view/option-view.js';
import {getClosestOption, getClosestDisabled} from '../utils/element.js';
import {UserAction, UpdateType} from '../const.js';

export default class SelectPresenter {
  #selectContainer = null;
  #selectModel = null;

  #selectComponent = null;
  #optGroupComponents = new Map();
  #optionComponents = [];

  constructor({selectContainer, selectModel}) {
    this.#selectContainer = selectContainer;
    this.#selectModel = selectModel;

    this.#selectModel.addObserver(this.#handleModelEvent);
  }

  get select() {
    return this.#selectModel.select;
  }

  init() {
    this.#renderSelect();
  }

  #handleClick = (evt) => {
    if (this.select.isDisabled || this.#optGroupComponents.has(evt.target.id) || getClosestDisabled(evt.target, evt.currentTarget)) {
      return;
    }

    const clickedOption = getClosestOption(evt.target, evt.currentTarget);

    if (clickedOption) {
      const option = this.select.options[Number(clickedOption.dataset.index)];

      this.#handleViewAction(UserAction.SET_SELECTED, this.select.isMultiple ? UpdateType.MINOR : UpdateType.NONE, {
        selectedOptions: this.#getSelectedOptions(evt, option),
        activeDescendant: option,
        selectedIndex: (this.select.isMultiple && evt.shiftKey && this.select.selectedIndex !== -1) ? this.select.selectedIndex : option.index,
      });
    }

    if (!this.select.isMultiple) {
      this.#handleViewAction(UserAction.TOGGLE_SELECT, UpdateType.MAJOR);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.SET_SELECTED:
        this.#selectModel.setSelected(updateType, update);

        break;
      case UserAction.TOGGLE_SELECT:
        this.#selectModel.toggleSelect(updateType);

        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.NONE:
        break;
      case UpdateType.MINOR:
        this.#optionComponents.forEach((component, index) => component.updateElement(this.select.options[index]));
        this.#selectComponent.updateElement(data);

        break;
      case UpdateType.MAJOR:
        this.#clearSelect();
        this.#renderSelect();

        if (this.select.isOpened) {
          this.#optionComponents[this.select.activeDescendant.index].element.focus();

          return;
        }

        this.#selectComponent.element.focus();

        break;
    }
  };

  #getSelectedOptions(evt, option) {
    if (this.select.isMultiple && evt.ctrlKey) {
      const selectedOptions = new Set(this.select.selectedOptions);

      if (selectedOptions.has(option)) {
        selectedOptions.delete(option);
      } else {
        selectedOptions.add(option);
      }

      return selectedOptions;
    }

    if (this.select.isMultiple && evt.shiftKey) {
      const selectedIndex = (this.select.selectedIndex === -1) ? option.index : this.select.selectedIndex;
      const selectionStart = Math.min(selectedIndex, option.index);
      const selectionEnd = Math.max(selectedIndex, option.index) + 1;
      const selectedOptions = new Set(this.select.options.slice(selectionStart, selectionEnd).filter(({isDisabled}) => !isDisabled));

      return selectedOptions;
    }

    return new Set([option]);
  }

  #renderOption(option) {
    const optGroup = option.optGroup;

    if (optGroup && !this.#optGroupComponents.has(optGroup.id)) {
      this.#renderOptGroup(optGroup);
    }

    const optionComponent = new OptionView({option});

    render(optionComponent, optGroup ? this.#optGroupComponents.get(optGroup.id).element.lastElementChild : this.#selectComponent.element.lastElementChild);
    this.#optionComponents.push(optionComponent);
  }

  #renderOptGroup(optGroup) {
    const optGroupComponent = new OptGroupView({optGroup});

    this.#optGroupComponents.set(optGroup.id, optGroupComponent);

    render(optGroupComponent, this.#selectComponent.element.lastElementChild);
  }

  #renderOptions(options) {
    options.forEach((option) => this.#renderOption(option));
  }

  #clearSelect() {
    this.#optGroupComponents.clear();
    this.#optionComponents = [];

    remove(this.#selectComponent);
  }

  #renderSelect() {
    this.#selectComponent = new SelectView({
      select: this.select,
      onClick: this.#handleClick,
    });

    render(this.#selectComponent, this.#selectContainer);

    this.#renderOptions(this.select.options);
  }
}
