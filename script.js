let mainBlock = document.querySelector(".calculator__wrapper");
let field = document.querySelector(".calculator__result");
let indicator = false,
  indicatorTwo = false;
let activeTool = null;
let operation = null;
let firstNumber = "0",
  secondNumber = null;
let fieldTwo = "0";
let result="0";
let count = 0;
let indicatorOperation = false;
function clearActive() {
  document.querySelectorAll(".calculator__tool").forEach((element) => {
    element.classList.remove("active");
  });
}
function getSecondNumber(target) {
  if (fieldTwo == "0") {
    if (target.innerHTML != ",") {
      fieldTwo = "";
      field.innerHTML = fieldTwo;
    }
  }
  if (target.innerHTML == "," && indicatorTwo == false) {
    fieldTwo += target.innerHTML;
    indicatorTwo = true;
    field.innerHTML = fieldTwo;
  }
  if (target.innerHTML != ",") {
    fieldTwo += target.innerHTML;
    secondNumber = fieldTwo;
    field.innerHTML = fieldTwo;
  }
}
function clearVar() {
  firstNumber = "";
  secondNumber = null;
  indicator = false;
  indicatorTwo = false;
  operation = null;
  fieldTwo = "0";
}
function findComma(str) {
  if (str != null) {
    let array = str.split("");
    array.find((item, index) => {
      if (item == ",") {
        array[index] = ".";
        return true;
      }
    });
    return array.join("");
  }
}
function findDot(str) {
  if (str != null) {
    let array = str.split("");
    array.find((item, index) => {
      if (item == ".") {
        array[index] = ",";
        return true;
      }
    });
    return array.join("");
  }
}
function intOrDouble(str){
	str = String(str);
	str.split('').forEach(item =>{
		if (item == ",") return true;
	})
	return false;
}

document.addEventListener("keydown", function (event) {
	console.log(`Нажата клавиша ${event.code} (${event.key})`);
});

mainBlock.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName == "SPAN") {
    if (
      target.classList != "calculator__tool" &&
      target.classList != "calculator__tool active") {
      if (target.classList != "calculator__auxiliary-tool") {
        console.log("number");
        if (!operation) {
			field.setAttribute('id','first');
          field.innerHTML = firstNumber;
          if (field.innerHTML == "0") {
            if (target.innerHTML != ",") field.innerHTML = "";
          }
          if (target.innerHTML == "," && indicator == false) {
            field.innerHTML += target.innerHTML;
            indicator = true;
          }
          if (target.innerHTML != ",") {
            field.innerHTML += target.innerHTML;
            firstNumber = field.innerHTML;
          }
          firstNumber = field.innerHTML;
        } else {
          if (!indicatorOperation) {
            getSecondNumber(target);
          } else {
				field.setAttribute('id','second');
            fieldTwo = "0";
            secondNumber = "0";
            getSecondNumber(target);
            indicatorOperation = false;
          }
        }
      }
    }
	 if (target.innerHTML == "AC") {
		clearActive();
		clearVar();
		firstNumber = "0";
	}
	 if (secondNumber !== null || firstNumber != "0"){
		 console.log(firstNumber);
		let cleaner = document.getElementById("cleaner");
		cleaner.innerHTML = "C";
	  }
    if (target.classList == "calculator__auxiliary-tool") {
      console.log("axul-tool");
      if (target.innerHTML == "C") {
			field.innerHTML = "0";
			target.innerHTML = "AC";
			console.log(target.innerHTML);
			if (field.getAttribute('id')){
				if (field.getAttribute('id') == "first") {
					firstNumber = "0";
					indicator = false;
				}
				else if (field.getAttribute('id') == "second"){
					 secondNumber = "0"
					 fieldTwo="0";
					 indicatorTwo = false;
				};
			}
      }

      if (target.innerHTML == "%") {
			field.innerHTML = findDot(String(findComma(field.innerHTML)/100));
			if (field.getAttribute('id') == "first"){ 
				firstNumber = field.innerHTML;
				indicator = true;
			}
			else if (field.getAttribute('id') == "second") {
				secondNumber = field.innerHTML;
				indicatorTwo = true;
			}

      }
      if (target.innerHTML == "+/-") {
			field.innerHTML = field.innerHTML*(-1);
			if (field.getAttribute('id') == "first") firstNumber = field.innerHTML;
			else if (field.getAttribute('id') == "second") secondNumber = field.innerHTML;
      }
    }
  }
  if (target.classList == "calculator__tool") {
    console.log("tool");
    clearActive();
    target.classList.add("active");
    activeTool = document.querySelector(".calculator__tool.active");
    if (activeTool.innerHTML != "=") {
      console.log("not =");
      operation = activeTool.innerHTML;
		field.setAttribute('id','second');
      indicatorTwo = false;
    }
    if (activeTool.innerHTML == "=" && !operation) {
      console.log("no operation");
      clearActive();
		if (!count) field.innerHTML = firstNumber;
      clearVar();
		firstNumber = "0";
		count++;
    }

    if (operation && activeTool.innerHTML == "=") {
      console.log("operation and = ", operation);
		field.setAttribute('id','first');
      console.log("first and second", firstNumber, secondNumber);
      if (secondNumber == null) secondNumber = firstNumber;

      firstNumber = findComma(firstNumber);
      secondNumber = findComma(secondNumber);

      if (operation == "*") {
			if (firstNumber != "ERROR") result = firstNumber * secondNumber;
			else field.innerHTML = firstNumber;
			if (!intOrDouble(result)){
				indicator = false;
				indicatorTwo = false;
			}
		}

      if (operation == "+"){
			if (firstNumber != "ERROR") result = Number(firstNumber) + Number(secondNumber);
			else field.innerHTML = firstNumber;
			if (!intOrDouble(result)){
				indicator = false;
				indicatorTwo = false;

			}
		}
		if (operation == "-") {
			if (firstNumber != "ERROR") result = firstNumber - secondNumber;
			else field.innerHTML = firstNumber;
			if (!intOrDouble(result)){
				indicator = false;
				indicatorTwo = false;

			}
		}
		if (operation == "/") {
			if (Number(secondNumber)) result = firstNumber / secondNumber;
			else { 
			result = 'ERROR';
			field.innerHTML = result;
			firstNumber = "ERROR";
			return 0;
			}
			if (!intOrDouble(result)){

				indicator = false;
				indicatorTwo = false;

			}
		}
      clearActive();
      firstNumber = String(result);
      field.innerHTML = findDot(String(result));
      indicatorOperation = true;
    }
  }

});
