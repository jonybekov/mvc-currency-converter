import { IView } from "../types";
import { View } from "../View";

export class SliderView extends View {
  render() {
    const root = document.getElementById("root");
    const input = document.createElement("div");

    input.innerHTML = "I am slider view";

    root.appendChild(input);
  }
}
