import SelectModel from './model/select-model.js';
import SelectPresenter from './presenter/select-presenter.js';

const selectContainer = document.querySelector('.select-container');

const selectModel = new SelectModel();
const selectPresenter = new SelectPresenter({
  selectContainer,
  selectModel,
});

selectPresenter.init();
