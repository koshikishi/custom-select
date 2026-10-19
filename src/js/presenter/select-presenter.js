import {render, remove} from '../framework/render.js';
import SelectView from '../view/select-view.js';
import OptGroupView from '../view/optgroup-view.js';
import OptionView from '../view/option-view.js';

export default class SelectPresenter {
  #selectContainer = null;
  #selectModel = null;

  #selectComponent = null;
  #optGroupComponents = new Map();
  #optionComponents = new Map();

  constructor({selectContainer, selectModel}) {
    this.#selectContainer = selectContainer;
    this.#selectModel = selectModel;
  }

  get select() {
    return this.#selectModel.select;
  }

  init() {
    this.#renderSelect();
  }

  #handleSelectClick = () => {
    if (this.select.isDisabled) {
      return;
    }

    if (!this.select.isMultiple) {
      this.select.isOpened = !this.select.isOpened;

      this.#clearSelect();
      this.#renderSelect();
    }
  };

  #renderOption(option) {
    const optGroup = option.optGroup;

    if (optGroup && !this.#optGroupComponents.has(optGroup)) {
      this.#renderOptGroup(optGroup);
    }

    const optionComponent = new OptionView({option});

    render(optionComponent, optGroup ? this.#optGroupComponents.get(optGroup).element.lastElementChild : this.#selectComponent.element.lastElementChild);
    this.#optionComponents.set(option, optionComponent);
  }

  #renderOptGroup(optGroup) {
    const optGroupComponent = new OptGroupView({optGroup});

    this.#optGroupComponents.set(optGroup, optGroupComponent);

    render(optGroupComponent, this.#selectComponent.element.lastElementChild);
  }

  #renderOptions(options) {
    options.forEach((option) => this.#renderOption(option));
  }

  #clearSelect() {
    this.#optGroupComponents.clear();
    this.#optionComponents.clear();

    remove(this.#selectComponent);
  }

  #renderSelect() {
    this.#selectComponent = new SelectView({
      select: this.select,
      onClick: this.#handleSelectClick,
    });

    render(this.#selectComponent, this.#selectContainer);

    this.#renderOptions(this.select.options);
  }
}
