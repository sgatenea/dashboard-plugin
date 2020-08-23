function createCalculator() {
  var c = loadCalcDef();
  return {
    visible: c.visible,
    posx: c.posx,
    posy: c.posy,
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    toggle: function() {
      this.visible = !this.visible;
      var c = loadCalcDef();
      c.visible = this.visible;
      c = JSON.stringify(c);
      localStorage.setItem('calculator', c);
    },
    inputDigit: function(d) {
      console.log('input:', d);
      if (this.waitingForSecondOperand === true) {
        this.displayValue = d;
        this.waitingForSecondOperand = false;
      } else {
        this.displayValue = this.displayValue === '0'
          ? d : this.displayValue + d;
      }
    },
    inputDecimal: function(dot) {
      if (this.waitingForSecondOperand === true) {
        this.displayValue = "0.";
        this.waitingForSecondOperand = false;
        return;
      }

      if (!this.displayValue.includes(dot)) {
        this.displayValue += dot;
      }
    },
    handleOperator: function(nextOperator) {
      const inputValue = parseFloat(this.displayValue);
      
      if (this.operator && this.waitingForSecondOperand)  {
        this.operator = nextOperator;
        return;
      }

      if (this.firstOperand == null && !isNaN(this.inputValue)) {
        this.firstOperand = this.inputValue;
      } else if (this.operator) {
        const result = calculate(
          this.firstOperand,
          inputValue,
          this.operator
        );
        this.displayValue = parseFloat(result.toFixed(7));
        this.firstOperand = result;
      }

      this.waitingForSecondOperand = true;
      this.operator = nextOperator;
    },
    reset: function() {
      this.displayValue = '0';
      this.firstOperand = null;
      this.waitingForSecondOperand = false;
      this.operator = null;
    },
  };
};

function loadCalcDef() {
  var calc = localStorage.getItem('calculator');
  if ( !calc ) {
    return {
      id: 0,
      posy: 0,
      posx: 0,
      visible: true,
    };
  }
  return JSON.parse(calc);
};

function setCalcPos(id, pos) {
  var c = loadCalcDef();
  c.posy = pos.y;
  c.posx = pos.x;
  c = JSON.stringify(c);
  localStorage.setItem('calculator', c);
};

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
};
