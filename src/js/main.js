import SelectPresenter from './presenter/select-presenter.js';

const selectContainer = document.querySelector('.select-container');
const selectPresenter = new SelectPresenter({selectContainer});

selectPresenter.init();
