const BaseId = {
  DATALIST: 'select-datalist',
  OPTGROUP: 'select-optgroup',
  OPTION: 'select-option',
};

const ClassName = {
  SELECT_OPENED: 'custom-select--opened',
  SELECT_MULTIPLE: 'custom-select--multiple',
  SELECT_DISABLED: 'custom-select--disabled',
  SELECT_REQUIRED: 'custom-select--required',
  HEADER_LABEL: 'custom-select__header-label',
  OPTGROUP_DISABLED: 'custom-select__optgroup--disabled',
  OPTION_SELECTED: 'custom-select__option--selected',
  OPTION_DISABLED: 'custom-select__option--disabled',
};

const UserAction = {
  SET_SELECTED: 'SET_SELECTED',
  TOGGLE_SELECT: 'TOGGLE_SELECT',
};

const UpdateType = {
  NONE: 'NONE',
  SELECT: 'SELECT',
  ALL: 'ALL',
};

const EventType = {
  CLICK: 'click',
  KEYDOWN: 'keydown',
  FOCUSOUT: 'focusout',
};

const KeyValue = {
  ENTER: 'Enter',
  SPACEBAR: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
};

export {BaseId, ClassName, UserAction, UpdateType, EventType, KeyValue};
