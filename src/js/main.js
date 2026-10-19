import SelectView from './view/select-view.js';
import OptionView from './view/option-view.js';
import {render} from './render.js';

const selectContainer = document.querySelector('.select-container');

const selectComponent = new SelectView();
const optionComponent = new OptionView();

render(selectComponent, selectContainer);
render(optionComponent, selectComponent.element.lastElementChild);
