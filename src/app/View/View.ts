import { InputChangeParams, IView } from ".";
import { IEvent } from "../Event";
import { IEuroToCurrency } from "../types";

export class View implements IView {
  app: HTMLElement;
  inputChangeEvent: IEvent<InputChangeParams>;

  constructor() {
    this.app = document.getElementById("root");
  }

  convert(value: IEuroToCurrency) {
    console.log(value);
  }

  render() {}
}
