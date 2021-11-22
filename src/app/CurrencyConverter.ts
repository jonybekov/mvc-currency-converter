import { Event, IEvent } from "./Event";
import {
  EuroToCurrencyList,
  ICurrencyConverter,
  IHasMode,
  ModeEnum,
} from "./types";

export class CurrencyConverter implements ICurrencyConverter, IHasMode {
  mode = ModeEnum.INPUT;
  euroToCurrencyList: EuroToCurrencyList;

  modeEvent: IEvent;
  convertEvent: IEvent;

  constructor() {
    this.euroToCurrencyList = [
      {
        id: 1,
        euroAmount: 0,
        currency: {
          name: "USD",
          rate: 1.06,
        },
        totalAmount: 106,
      },
      {
        id: 2,
        euroAmount: 0,
        currency: {
          name: "Ital. Lira",
          rate: 1936.27,
        },
        totalAmount: 193.627,
      },
      {
        id: 3,
        euroAmount: 0,
        currency: {
          name: "Ir. Pounds",
          rate: 0.79,
        },
        totalAmount: 78.76,
      },
    ];
    this.convertEvent = new Event();
    this.modeEvent = new Event();
  }

  setRate(currencyId: number, rate: number) {
    const targetIndex = this.euroToCurrencyList.findIndex(
      (currency) => currency.id === currencyId
    );

    this.euroToCurrencyList[targetIndex].currency.rate = rate;
    this.convertEvent.trigger(this.euroToCurrencyList[targetIndex]);
  }

  convert(currencyId: number, amount: number) {
    const targetIndex = this.euroToCurrencyList.findIndex(
      (currency) => currency.id === currencyId
    );

    const targetCurrency = this.euroToCurrencyList[targetIndex];
    this.euroToCurrencyList[targetIndex].euroAmount = amount;
    this.euroToCurrencyList[targetIndex].totalAmount =
      amount * targetCurrency.currency.rate;

    this.convertEvent.trigger(this.euroToCurrencyList[targetIndex]);
  }

  changeMode(mode: ModeEnum) {
    this.mode = mode;

    this.modeEvent.trigger(mode);
  }
}
