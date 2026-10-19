import AbstractView from '../framework/view/abstract-view.js';

const createOptGroupTemplate = (optGroup) => {
  const {id, label, isDisabled} = optGroup;

  const disabledClassName = isDisabled ? 'custom-select__optgroup--disabled' : '';

  return `<li class="custom-select__optgroup ${disabledClassName}" role="group" ${isDisabled ? 'aria-disabled="true"' : ''} aria-labelledby="select-optgroup-${id}">
    <div class="custom-select__optgroup-label" id="select-optgroup-${id}" aria-hidden="true">${label}</div>
    <ul class="custom-select__optgroup-list" role="none"></ul>
  </li>`;
};

export default class OptGroupView extends AbstractView {
  #optGroup = null;

  constructor({optGroup}) {
    super();
    this.#optGroup = optGroup;
  }

  get template() {
    return createOptGroupTemplate(this.#optGroup);
  }
}
