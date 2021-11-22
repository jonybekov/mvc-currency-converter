import { IEvent } from "./Event";

export enum ModeEnum {
  INPUT = "INPUT",
  SLIDER = "SLIDES",
}

export interface IHasMode {
  mode: ModeEnum;
  modeEvent: IEvent;
  changeMode(mode: ModeEnum): void;
}

export interface ICurrencyConverter {
  convertEvent: IEvent;
  setRate(currencyId: number, rate: number);
  convert(amount: number, currencyId: number): void;
}

export interface IEuroToCurrency {
  id: number;
  euroAmount: number;
  currency: {
    name: string;
    rate: number;
  };
  totalAmount: number;
}

export type EuroToCurrencyList = IEuroToCurrency[];
