import SelectModel from './model/select-model.js';
import SelectPresenter from './presenter/select-presenter.js';
import SelectAdapter from './native/select-adapter.js';
import SelectManager from './native/select-manager.js';

document.querySelectorAll('.custom-select-styled').forEach((select) => {
  const selectModel = new SelectModel({
    selectAdapter: new SelectAdapter(select),
  });
  const selectManager = new SelectManager({
    selectModel,
  });
  const selectPresenter = new SelectPresenter({
    selectContainer: select.parentElement,
    selectModel,
    selectManager,
  });

  selectPresenter.init();
});
