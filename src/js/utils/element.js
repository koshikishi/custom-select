/**
 * Finds the closest element that satisfies a predicate.
 * @param {(element: HTMLElement) => boolean} predicate - a function to determine if the element satisfies the condition.
 * @param {HTMLElement} element - the element to start the search from.
 * @param {HTMLElement} ancestor - the upper boundary element of the search.
 * @returns {HTMLElement|null} the closest matching element or null.
 */
const getClosestElement = (predicate, element, ancestor) => {
  if (predicate(element)) {
    return element;
  }

  return (element === ancestor || element.parentElement === null) ? null : getClosestElement(predicate, element.parentElement, ancestor);
};

/**
 * Finds the closest option element.
 * @param {HTMLElement} element - the element to start the search from.
 * @param {HTMLElement} ancestor - the upper boundary element of the search.
 * @returns {HTMLElement|null} the closest option element or null.
 */
const getClosestOption = getClosestElement.bind(null, (element) => element.role === 'option');

/**
 * Finds the closest disabled element.
 * @param {HTMLElement} element - the element to start the search from.
 * @param {HTMLElement} ancestor - the upper boundary element of the search.
 * @returns {HTMLElement|null} the closest disabled element or null.
 */
const getClosestDisabled = getClosestElement.bind(null, (element) => element.ariaDisabled === 'true');

export {getClosestOption, getClosestDisabled};
