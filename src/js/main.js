import SelectModel from './model/select-model.js';
import SelectPresenter from './presenter/select-presenter.js';
import SelectAdapter from './native/select-adapter.js';

const select = document.getElementById('custom-select');

const selectModel = new SelectModel({
  selectAdapter: new SelectAdapter(select),
});
const selectPresenter = new SelectPresenter({
  selectContainer: select.parentElement,
  selectModel,
});

selectPresenter.init();
