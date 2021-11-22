type IListener = (...args) => void;

export interface IEvent<Type = {}> {
  listeners: Array<IListener>;
  addEventListener(listener: (...args) => void): void;
  trigger<T>(params?: T & Type): void;
}

export class Event<T = {}> implements IEvent<T> {
  listeners: Array<IListener>;

  constructor() {
    this.listeners = [];
  }

  addEventListener(listener: IListener) {
    this.listeners.push(listener);
  }

  trigger<T extends any>(params: T) {
    this.listeners.forEach((listener) => {
      typeof listener === "function" && listener(params);
    });
  }
}
