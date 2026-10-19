import {mockSelect} from '../mock/select.js';

export default class SelectModel {
  #select = mockSelect;

  get select() {
    return this.#select;
  }
}
