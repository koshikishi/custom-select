import {nanoid} from 'nanoid';

const selectOptions = [
  {
    id: `select-option-${nanoid()}`,
    index: 0,
    optGroup: null,
    label: 'Cat',
    isSelected: true,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 1,
    optGroup: null,
    label: 'Dog',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 2,
    optGroup: null,
    label: 'Parrot',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 3,
    optGroup: null,
    label: 'Fish',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 4,
    optGroup: null,
    label: 'Hamster',
    isSelected: false,
    isDisabled: false,
  },
];

const catsOptGroup = {
  id: `select-optgroup-${nanoid()}`,
  label: 'Cats',
  isDisabled: false,
};

const dogsOptGroup = {
  id: `select-optgroup-${nanoid()}`,
  label: 'Dogs',
  isDisabled: false,
};

const selectOptGroupOptions = [
  {
    id: `select-option-${nanoid()}`,
    index: 0,
    optGroup: catsOptGroup,
    label: 'American Shorthair',
    isSelected: true,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 1,
    optGroup: catsOptGroup,
    label: 'British Shorthair',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 2,
    optGroup: catsOptGroup,
    label: 'Maine Coon',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 3,
    optGroup: dogsOptGroup,
    label: 'Dobermann',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: `select-option-${nanoid()}`,
    index: 4,
    optGroup: dogsOptGroup,
    label: 'German Shepherd',
    isSelected: false,
    isDisabled: false,
  },
];

const mockSelect = {
  id: `custom-select-${nanoid()}`,
  options: selectOptions,
  selectedOptions: new Set([selectOptions[0]]),
  selectedIndex: 0,
  activeDescendant: selectOptions[0],
  classList: ['custom-select-styled'],
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: false,
  isDisabled: false,
  isRequired: false,
};

const mockSelectMultiple = {
  id: `custom-select-${nanoid()}`,
  options: selectOptions.map((option) => ({...option, id: `select-option-${nanoid()}`, isSelected: false})),
  selectedOptions: new Set(),
  selectedIndex: -1,
  activeDescendant: null,
  classList: ['custom-select-multiple-styled'],
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: true,
  isDisabled: false,
  isRequired: false,
};

const mockSelectOptGroup = {
  id: `custom-select-${nanoid()}`,
  options: selectOptGroupOptions,
  selectedOptions: new Set([selectOptGroupOptions[0]]),
  selectedIndex: 0,
  activeDescendant: selectOptions[0],
  classList: ['custom-select-optgroup-styled'],
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: false,
  isDisabled: false,
  isRequired: false,
};

const mockSelectOptGroupMultiple = {
  id: `custom-select-${nanoid()}`,
  options: selectOptGroupOptions.map((option) => ({...option, id: `select-option-${nanoid()}`, isSelected: false})),
  selectedOptions: new Set(),
  selectedIndex: -1,
  activeDescendant: null,
  classList: ['custom-select-optgroup-multiple-styled'],
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: true,
  isDisabled: false,
  isRequired: false,
};

export {mockSelect, mockSelectMultiple, mockSelectOptGroup, mockSelectOptGroupMultiple};
