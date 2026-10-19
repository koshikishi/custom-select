import SelectView from '../view/select-view.js';
import OptionView from '../view/option-view.js';
import {render} from '../render.js';

export default class SelectPresenter {
  #selectContainer = null;
  #selectModel = null;

  #selectComponent = new SelectView();
  #optionComponent = new OptionView();

  constructor({selectContainer, selectModel}) {
    this.#selectContainer = selectContainer;
    this.#selectModel = selectModel;
  }

  init() {
    this.#selectComponent = new SelectView({
      select: this.#selectModel,
    });

    render(this.#selectComponent, this.#selectContainer);
    render(this.#optionComponent, this.#selectComponent.element.lastElementChild);
  }
}
