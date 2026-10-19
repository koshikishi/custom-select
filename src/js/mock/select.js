const selectOptions = [
  {
    id: 1,
    optGroup: null,
    label: 'Cat',
    value: 'Cat',
    isSelected: true,
    isDisabled: false,
  },
  {
    id: 2,
    optGroup: null,
    label: 'Dog',
    value: 'Dog',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 3,
    optGroup: null,
    label: 'Parrot',
    value: 'Parrot',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 4,
    optGroup: null,
    label: 'Fish',
    value: 'Fish',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 5,
    optGroup: null,
    label: 'Hamster',
    value: 'Hamster',
    isSelected: false,
    isDisabled: false,
  },
];

const catsOptGroup = {
  id: 1,
  label: 'Cats',
  isDisabled: false,
};

const dogsOptGroup = {
  id: 2,
  label: 'Dogs',
  isDisabled: false,
};

const selectOptGroupOptions = [
  {
    id: 6,
    optGroup: catsOptGroup,
    label: 'American Shorthair',
    value: 'American Shorthair',
    isSelected: true,
    isDisabled: false,
  },
  {
    id: 7,
    optGroup: catsOptGroup,
    label: 'British Shorthair',
    value: 'British Shorthair',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 8,
    optGroup: catsOptGroup,
    label: 'Maine Coon',
    value: 'Maine Coon',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 9,
    optGroup: dogsOptGroup,
    label: 'Dobermann',
    value: 'Dobermann',
    isSelected: false,
    isDisabled: false,
  },
  {
    id: 10,
    optGroup: dogsOptGroup,
    label: 'German Shepherd',
    value: 'German Shepherd',
    isSelected: false,
    isDisabled: false,
  },
];

const mockSelect = {
  id: 1,
  options: selectOptions,
  selectedOptions: [selectOptions[0]],
  lastSelectedOption: selectOptions[0],
  lastFocusedOption: null,
  classList: ['custom-select-styled'],
  value: selectOptions[0].value,
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: false,
  isDisabled: false,
  isRequired: false,
};

const mockSelectMultiple = {
  id: 2,
  options: selectOptions.map((option) => ({...option, id: option.id + 10, isSelected: false})),
  selectedOptions: [],
  lastSelectedOption: null,
  lastFocusedOption: null,
  classList: ['custom-select-multiple-styled'],
  value: '',
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: true,
  isDisabled: false,
  isRequired: false,
};

const mockSelectOptGroup = {
  id: 3,
  options: selectOptGroupOptions,
  selectedOptions: [selectOptGroupOptions[0]],
  lastSelectedOption: selectOptGroupOptions[0],
  lastFocusedOption: null,
  classList: ['custom-select-optgroup-styled'],
  value: selectOptGroupOptions[0].value,
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: false,
  isDisabled: false,
  isRequired: false,
};

const mockSelectOptGroupMultiple = {
  id: 4,
  options: selectOptGroupOptions.map((option) => ({...option, id: option.id + 10, isSelected: false})),
  selectedOptions: [],
  lastSelectedOption: null,
  lastFocusedOption: null,
  classList: ['custom-select-optgroup-multiple-styled'],
  value: '',
  size: 0,
  tabIndex: 0,
  isOpened: false,
  isMultiple: true,
  isDisabled: false,
  isRequired: false,
};

export {mockSelect, mockSelectMultiple, mockSelectOptGroup, mockSelectOptGroupMultiple};
