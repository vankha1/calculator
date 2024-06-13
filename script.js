const display = document.querySelector(".input");
const buttons = document.querySelectorAll("button");

const operators = ["%", "x", "/", "-", "+", "="];
let result = "";

const convertSign = (num) => {
  return num < 0 ? num : `(-${num})`;
};

const calculate = (btnValue) => {
  display.focus();
  if (result === "" && operators.includes(btnValue)) return;

  if (btnValue === "=" && result !== "") {
    result = result.replace("x", "*").replace("(", "").replace(")", "");
    result = eval(result);
  } else if (btnValue === "AC") {
    result = "";
  } else if (btnValue === "+/-") {
    const lastOp = [...display.value]
      .filter((char) => operators.includes(char))
      .at(-1);
    const index = [...display.value].lastIndexOf(lastOp);
    let lastNum = display.value.slice(index + 1);

    if (lastNum === "") return;

    if (lastNum.includes(")")) {
      result = result.slice(0, index - 1);
      result += lastNum[0];
    } else {
      result = result.slice(0, index + 1);
      result += convertSign(+lastNum);
    }
  } else {
    result += btnValue;
  }

  display.value = result;
};

const handleOnclick = (e) => calculate(e.target.dataset.value);

buttons.forEach((button) => {
  button.onclick = handleOnclick;
});
