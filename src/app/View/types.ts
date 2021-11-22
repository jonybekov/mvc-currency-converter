import { InputChangeParams } from ".";
import { IEuroToCurrency } from "../CurrencyConverter";
import { IEvent } from "../Event";

export interface IView {
  app: HTMLElement;
  inputChangeEvent: IEvent<InputChangeParams>;
  convert(value: IEuroToCurrency);
  render();
}
