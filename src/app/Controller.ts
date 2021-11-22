import { CurrencyConverter } from "./CurrencyConverter";
import { InputView, SliderView, IView } from "./View";

export class Controller {
  view: IView;
  model: CurrencyConverter;

  constructor() {
    this.model = new CurrencyConverter();
    this.view = new InputView(this.model.euroToCurrencyList);
    this.init();
  }

  init(view?: IView) {
    this.model.convertEvent.addEventListener((value) => {
      this.view.convert(value);
    });

    this.view.inputChangeEvent.addEventListener(
      ({ type, currencyId, value }) => {
        if (type === "rate") {
          this.model.setRate(currencyId, Number(value));
        } else if (type === "amount") {
          this.model.convert(currencyId, Number(value));
        }
      }
    );

    if (view) this.view = view;
  }

  run() {
    this.view.render();
  }
}
