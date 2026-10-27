import {render} from '../framework/render.js';
import SelectView from '../view/select-view.js';
import OptGroupView from '../view/optgroup-view.js';
import OptionView from '../view/option-view.js';
import {getClosestOption, getClosestDisabled} from '../utils/element.js';
import {UserAction, UpdateType, EventType, KeyValue} from '../const.js';

export default class SelectPresenter {
  #selectContainer = null;
  #selectModel = null;
  #selectManager = null;

  #selectComponent = null;
  #optGroupComponents = new Map();
  #optionComponents = [];

  #initState = null;
  #prevOption = null;

  constructor({selectContainer, selectModel, selectManager}) {
    this.#selectContainer = selectContainer;
    this.#selectModel = selectModel;
    this.#selectManager = selectManager;
    this.#initState = structuredClone(selectModel.select);

    this.#selectModel.addObserver(this.#handleModelEvent);
  }

  get select() {
    return this.#selectModel.select;
  }

  init() {
    this.#renderSelect();
    this.#selectManager.hideOrigin(this.#selectComponent.element);

    this.#selectModel.origin.addEventListener('invalid', this.#invalidHandler);
    this.#selectModel.origin.form?.addEventListener('reset', this.#resetHandler);
  }

  #handleClick = (evt) => {
    if (this.select.isDisabled || this.#optGroupComponents.has(evt.target.id) || getClosestDisabled(evt.target, evt.currentTarget)) {
      return;
    }

    if (evt.target === this.#selectModel.origin) {
      evt.preventDefault();
      evt.currentTarget.focus();

      return;
    }

    const clickedOption = getClosestOption(evt.target, evt.currentTarget);

    if (!this.select.isMultiple) {
      this.#handleViewAction(UserAction.TOGGLE_SELECT, clickedOption ? UpdateType.NONE : UpdateType.SELECT, EventType.CLICK);
    }

    if (!clickedOption) {
      return;
    }

    const option = this.select.options[Number(clickedOption.dataset.index)];

    this.#prevOption = option;
    this.#handleViewAction(UserAction.SET_SELECTED, UpdateType.ALL, EventType.CLICK, {
      selectedOptions: this.#getSelectedOptions(evt, option),
      activeDescendant: option,
      selectedIndex: (this.select.isMultiple && evt.shiftKey && this.select.selectedIndex !== -1) ? this.select.selectedIndex : option.index,
    });
  };

  #handleKeyDown = (evt) => {
    if (this.select.isDisabled) {
      return;
    }

    switch (evt.key) {
      case KeyValue.ENTER:
      case KeyValue.SPACEBAR:
        evt.preventDefault();
        evt.target.dispatchEvent(new PointerEvent('click', {
          bubbles: true,
          ctrlKey: evt.ctrlKey,
          shiftKey: evt.shiftKey,
          button: 0,
        }));

        break;
      case KeyValue.ESCAPE:
        if (!this.select.isOpened || this.select.isMultiple) {
          return;
        }

        this.#handleViewAction(UserAction.TOGGLE_SELECT, UpdateType.SELECT, EventType.KEYDOWN, false);

        break;
      case KeyValue.ARROW_UP:
      case KeyValue.ARROW_DOWN:
        evt.preventDefault();

        this.#handleNavigationKey(evt, evt.key === KeyValue.ARROW_DOWN);

        break;
      case KeyValue.ARROW_LEFT:
      case KeyValue.ARROW_RIGHT:
        if (this.select.isOpened || this.select.isMultiple) {
          return;
        }

        evt.preventDefault();

        this.#handleNavigationKey(evt, evt.key === KeyValue.ARROW_RIGHT);

        break;
      case KeyValue.HOME:
      case KeyValue.END:
        evt.preventDefault();

        this.#handleNavigationKey(evt, evt.key === KeyValue.END, {
          last: true,
        });

        break;
      case KeyValue.PAGE_UP:
      case KeyValue.PAGE_DOWN:
        evt.preventDefault();

        this.#handleNavigationKey(evt, evt.key === KeyValue.PAGE_DOWN, {
          step: this.select.isOpened ? 10 : 3,
        });

        break;
    }
  };

  #handleFocusOut = (evt) => {
    if (this.select.isMultiple || evt.currentTarget.contains(evt.relatedTarget)) {
      return;
    }

    this.#handleViewAction(UserAction.TOGGLE_SELECT, UpdateType.SELECT, EventType.FOCUSOUT, false);
  };

  #invalidHandler = (evt) => {
    evt.preventDefault();

    this.#handleViewAction(UserAction.SET_VALIDITY, UpdateType.SELECT, EventType.INVALID, true);
  };

  #resetHandler = () => {
    this.#handleViewAction(UserAction.SET_SELECTED, UpdateType.ALL, EventType.RESET, {
      selectedOptions: this.#initState.selectedOptions,
      activeDescendant: this.#initState.activeDescendant,
      selectedIndex: this.#initState.selectedIndex,
    });
  };

  #handleViewAction(actionType, updateType, eventType, data) {
    switch (actionType) {
      case UserAction.SET_SELECTED:
        this.#selectModel.setSelected(updateType, eventType, data);

        break;
      case UserAction.TOGGLE_SELECT:
        this.#selectModel.toggleSelect(updateType, eventType, data);

        break;
      case UserAction.SET_VALIDITY:
        this.#selectModel.setValidity(updateType, eventType, data);

        break;
    }
  }

  #handleModelEvent = (updateType, eventType, data) => {
    switch (updateType) {
      case UpdateType.NONE:
        break;
      case UpdateType.SELECT:
        this.#selectComponent.updateElement(data);

        if (data.isOpened) {
          this.#optionComponents[data.activeDescendant.index].element.focus();

          return;
        }

        if (eventType !== EventType.FOCUSOUT) {
          this.#selectComponent.element.focus();
        }

        break;
      case UpdateType.ALL:
        this.#optionComponents.forEach((component, index) => component.updateElement(data.options[index]));
        this.#selectComponent.updateElement(data);

        if (eventType === EventType.KEYDOWN && (data.isOpened || data.isMultiple)) {
          this.#optionComponents[data.activeDescendant.index].element.focus();

          return;
        }

        if (eventType === EventType.CLICK && !data.isMultiple) {
          this.#selectComponent.element.focus();
        }

        break;
    }
  };

  #handleNavigationKey(evt, next, {step = 1, last = false} = {}) {
    const lastOption = next ? this.select.options.findLast(({isDisabled}) => !isDisabled) : this.select.options.find(({isDisabled}) => !isDisabled);
    const option = last ? lastOption : this.#getNextOption(next, this.select.activeDescendant?.index ?? this.select.selectedIndex, step);

    if (!option || option?.id === this.#prevOption?.id) {
      return;
    }

    this.#prevOption = option;
    this.#handleViewAction(UserAction.SET_SELECTED, UpdateType.ALL, EventType.KEYDOWN, {
      selectedOptions: this.#getSelectedOptions(evt, option),
      activeDescendant: option,
      selectedIndex: (this.select.isMultiple && evt.shiftKey && this.select.selectedIndex !== -1) ? this.select.selectedIndex : option.index,
    });
  }

  #getNextOption(next, currentIndex = 0, step = 1) {
    const startIndex = this.select.options.findIndex(({isDisabled}) => !isDisabled);
    const endIndex = this.select.options.findLastIndex(({isDisabled}) => !isDisabled);

    if ((next && currentIndex === endIndex) || (!next && currentIndex === startIndex)) {
      return this.select.options[currentIndex];
    }

    const nextIndex = next ? Math.min(currentIndex + step, endIndex) : Math.max(((currentIndex === -1) ? endIndex + 1 : currentIndex) - step, startIndex);
    const option = this.select.options[nextIndex];

    return option.isDisabled ? this.#getNextOption(next, nextIndex) : option;
  }

  #getSelectedOptions(evt, option) {
    if (this.select.isMultiple && evt.ctrlKey) {
      const selectedOptions = new Set(this.select.selectedOptions);

      if (evt.type === EventType.KEYDOWN) {
        return selectedOptions;
      }

      if (selectedOptions.has(option)) {
        selectedOptions.delete(option);
      } else {
        selectedOptions.add(option);
      }

      return selectedOptions;
    }

    if (this.select.isMultiple && evt.shiftKey) {
      const selectedIndex = (this.select.selectedIndex === -1) ? option.index : this.select.selectedIndex;
      const selectionStart = Math.min(selectedIndex, option.index);
      const selectionEnd = Math.max(selectedIndex, option.index) + 1;
      const selectedOptions = new Set(this.select.options.slice(selectionStart, selectionEnd).filter(({isDisabled}) => !isDisabled));

      return selectedOptions;
    }

    return new Set([option]);
  }

  #renderOption(option) {
    const optGroup = option.optGroup;

    if (optGroup && !this.#optGroupComponents.has(optGroup.id)) {
      this.#renderOptGroup(optGroup);
    }

    const optionComponent = new OptionView({option});

    render(optionComponent, optGroup ? this.#optGroupComponents.get(optGroup.id).element.lastElementChild : this.#selectComponent.element.lastElementChild);
    this.#optionComponents.push(optionComponent);
  }

  #renderOptGroup(optGroup) {
    const optGroupComponent = new OptGroupView({optGroup});

    this.#optGroupComponents.set(optGroup.id, optGroupComponent);

    render(optGroupComponent, this.#selectComponent.element.lastElementChild);
  }

  #renderOptions(options) {
    options.forEach((option) => this.#renderOption(option));
  }

  #renderSelect() {
    this.#selectComponent = new SelectView({
      select: this.select,
      onClick: this.#handleClick,
      onKeyDown: this.#handleKeyDown,
      onFocusOut: this.#handleFocusOut,
    });

    render(this.#selectComponent, this.#selectContainer);

    this.#renderOptions(this.select.options);
  }
}
