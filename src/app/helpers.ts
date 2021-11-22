export function createLabeledField(config: {
  blockClassName?: string;
  dataType?: string;
  label?: string;
}) {
  const block = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");

  block.className = config.blockClassName;

  label.setAttribute("for", config.dataType);
  label.innerHTML = config.label;

  input.setAttribute("id", config.dataType);
  input.setAttribute("type", "number");
  input.setAttribute("data-type", config.dataType);

  block.appendChild(label);
  block.appendChild(input);

  return block;
}

interface CurrencyFieldsetConfig {
  legend?: string;
  target?: string;
  rate?: number;
  id: string | number;
}

export function createCurrencyFieldset(config?: CurrencyFieldsetConfig) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");

  // Rate field
  const rateBlock = document.createElement("div");
  const rateInput = document.createElement("input");
  const rateCurrency = document.createElement("span");

  rateBlock.innerHTML = "1 Euro is";
  rateCurrency.innerHTML = config.target;
  rateBlock.className = "rateBlock";

  rateInput.setAttribute("type", "number");
  rateInput.setAttribute("data-type", "amount");
  rateInput.value = String(config.rate);

  rateBlock.appendChild(rateInput);
  rateBlock.appendChild(rateCurrency);

  legend.innerHTML = config.legend;

  const flex = document.createElement("div");
  flex.className = "flex";

  // Amount field
  const amountField = this.createLabeledField({
    blockClassName: "currency",
    dataType: "amount",
    label: "Euro",
  });

  // Target field
  const targetField = this.createLabeledField({
    blockClassName: "currency",
    dataType: "target",
    label: config.target,
  });

  flex.appendChild(amountField);
  flex.appendChild(targetField);

  fieldset.appendChild(legend);
  fieldset.appendChild(rateBlock);
  fieldset.appendChild(flex);

  return fieldset;
}
