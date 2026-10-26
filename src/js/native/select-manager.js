export default class SelectManager {
  #origin = null;
  #selectModel = null;

  constructor({selectModel}) {
    this.#selectModel = selectModel;
    this.#origin = selectModel.origin;
  }

  hideOrigin(originContainer) {
    originContainer.append(this.#origin);

    this.#origin.tabIndex = -1;
    this.#origin.hidden = true;

    Array.prototype.forEach.call(this.#origin.labels, (label, index) => {
      if (label.id) {
        return;
      }

      label.id = this.#selectModel.select.labelIds[index];
    });
  }
}
