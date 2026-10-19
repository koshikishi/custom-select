import SelectView from '../view/select-view.js';
import OptGroupView from '../view/optgroup-view.js';
import OptionView from '../view/option-view.js';
import {render} from '../render.js';

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

  #renderSelect() {
    this.#selectComponent = new SelectView({
      select: this.select,
    });

    render(this.#selectComponent, this.#selectContainer);

    this.#renderOptions(this.select.options);
  }
}
