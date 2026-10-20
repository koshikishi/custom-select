/**
 * Finds the closest option element.
 * @param {HTMLElement} element - the element to start the search from.
 * @param {HTMLElement} ancestor - the upper boundary element of the search.
 * @returns {HTMLElement|null} the closest option element or null.
 */
const getClosestOption = (element, ancestor) => {
  if (element.role === 'option') {
    return element;
  }

  return (element === ancestor || element.parentElement === null) ? null : getClosestOption(element.parentElement, ancestor);
};

export {getClosestOption};
