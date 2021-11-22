import { View } from "../View";
import { Event, IEvent } from "../../Event";
import { EuroToCurrencyList, IEuroToCurrency } from "../../types";
import { createCurrencyFieldset } from "../../helpers";
export type InputTypes = "rate" | "amount";

export interface InputChangeParams {
  type: InputTypes;
  currencyId: string | number;
  value: string;
}

export class InputView extends View {
  private currencies: NodeListOf<HTMLFieldSetElement>;
  inputChangeEvent: IEvent<Partial<InputChangeParams>>;

  constructor(private fieldSets: EuroToCurrencyList) {
    super();
    this.inputChangeEvent = new Event();
  }

  bindInputListener() {
    const currencies = document.querySelectorAll("fieldset");

    currencies.forEach((currency, index) => {
      const inputs = currency.querySelectorAll<HTMLInputElement>(
        "input[type='number']"
      );

      inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
          const value = (<HTMLInputElement>e.target).value;
          const dataType = ((<HTMLInputElement>e.target).dataset as any).type;

          this.inputChangeEvent.trigger<InputChangeParams>({
            type: dataType,
            currencyId: index + 1,
            value,
          });
        });
      });
    });
  }

  convert(value: IEuroToCurrency) {
    const currencies = document.querySelectorAll("fieldset");
    const index = Math.max(value.id - 1, 0);
    const currency = currencies[index];

    const targetInput = currency.querySelector<HTMLInputElement>(
      'input[data-type="target"]'
    );
    targetInput.value = String(value.totalAmount);
  }

  render() {
    const root = document.querySelector("#root");

    this.fieldSets.forEach((fieldset) => {
      const renderedFieldset = createCurrencyFieldset({
        legend: "Euro To " + fieldset.currency.name,
        id: fieldset.id,
        rate: fieldset.currency.rate,
        target: fieldset.currency.name,
      });

      root.appendChild(renderedFieldset);
    });

    this.bindInputListener();
  }
}
