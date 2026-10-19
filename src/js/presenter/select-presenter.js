import SelectView from '../view/select-view.js';
import OptionView from '../view/option-view.js';
import {render} from '../render.js';

export default class SelectPresenter {
  #selectContainer = null;

  #selectComponent = new SelectView();
  #optionComponent = new OptionView();

  constructor({selectContainer}) {
    this.#selectContainer = selectContainer;
  }

  init() {
    render(this.#selectComponent, this.#selectContainer);
    render(this.#optionComponent, this.#selectComponent.element.lastElementChild);
  }
}
