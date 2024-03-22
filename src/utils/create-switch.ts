interface Switch {
  container: HTMLDivElement;
  input: HTMLInputElement;
}

let switchIdCounter = 1;

function createSwitch(checked?: boolean): Switch {
  const switchId = `switch-${switchIdCounter}`;
  const switchContainer = document.createElement("div");
  const switchInput = document.createElement("input");
  const switchLabel = document.createElement("label");

  switchInput.type = "checkbox";
  switchInput.setAttribute("id", switchId);
  switchInput.classList.add("switch-input");

  if (checked) switchInput.checked = checked;

  switchLabel.setAttribute("for", switchId);
  switchLabel.classList.add("switch-label");

  switchContainer.append(switchInput, switchLabel);

  switchIdCounter++;

  return {
    container: switchContainer,
    input: switchInput,
  };
}

export default createSwitch;
