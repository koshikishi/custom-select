const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Creates an element from a template.
 * @param {string} template - HTML markup of the element.
 * @returns {HTMLElement} a created element.
 */
const createElement = (template) => {
  const element = document.createElement('div');

  element.innerHTML = template;

  return element.firstElementChild;
};

/**
 * Renders a component.
 * @param {HTMLElement} component - the component to render.
 * @param {HTMLElement} container - the element where the component will be rendered.
 * @param {string} [position=beforeend] - the position of the component relative to the container.
 */
const render = (component, container, position = RenderPosition.BEFOREEND) => {
  if (!container) {
    throw new Error('Container element does not exist');
  }

  container.insertAdjacentElement(position, component.element);
};

export {RenderPosition, createElement, render};
