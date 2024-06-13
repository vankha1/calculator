const display = document.querySelector(".input");
const buttons = document.querySelectorAll("button");

const operators = ["%", "x", "/", "-", "+", "="];
let result = "";

const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" && result !== "") {
    result = result.replace("x", "*");
    result = eval(result);
  } else if (btnValue === "AC") {
    result = "";
  } else if (btnValue === "+/-") {
    const lastOp = [...display.value].filter((char) =>
      operators.includes(char)
    ).at(-1);
    const index = [...display.value].lastIndexOf(lastOp);
    // console.log( lastOp, index);
    const lastNum = display.value.slice(index + 1)
    console.log(lastNum)
    result = result.replace(
      lastNum,
      lastNum.includes('-') ? "" : "(-" + lastNum
    );
    // result += +btnValue < 0 ? "-" : "";
  } else {
    if (result === "" && operators.includes(btnValue)) return;
    result += btnValue;
  }

  display.value = result;
};

const handleOnclick = (e) => calculate(e.target.dataset.value);

buttons.forEach((button) => {
  button.onclick = handleOnclick;
});
