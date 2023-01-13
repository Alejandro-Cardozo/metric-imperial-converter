function ConvertHandler() {

  this.getNum = function(input) {
    let expression = input.replace(/[a-zA-Z]/gi, '');
    if (!expression) {
      return 1;
    }
    const regexp = new RegExp(/^(\d+(\.\d+)?)(\/?\d+(\.\d+)?)?$/);
    if (regexp.test(expression)) {
      return eval(expression);
    } else {
      return undefined
    }
  };

  this.getUnit = function(input) {
    let expression = input.replace(/^[^a-zA-Z]+/gi, '').toLowerCase();
    switch (expression) {
      case 'gal':
      case 'lbs':
      case 'kg':
      case 'mi':
      case 'km':
        return expression;
      case 'l':
        return expression.toUpperCase();
      default:
        return undefined
    }
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L'
      case 'L':
        return 'gal'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi';
      default:
        return undefined
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'gal':
        return 'gallons'
      case 'L':
        return 'liters'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
      default:
        return undefined
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal':
        return +Number.parseFloat(initNum * galToL).toFixed(5)
      case 'L':
        return +Number.parseFloat(initNum / galToL).toFixed(5)
      case 'lbs':
        return +Number.parseFloat(initNum * lbsToKg).toFixed(5)
      case 'kg':
        return +Number.parseFloat(initNum / lbsToKg).toFixed(5)
      case 'mi':
        return +Number.parseFloat(initNum * miToKm).toFixed(5)
      case 'km':
        return +Number.parseFloat(initNum / miToKm).toFixed(5)
      default:
        return undefined
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let finalUnit = this.spellOutUnit(returnUnit);
    let initialUnit = this.spellOutUnit(initUnit);
    return `${initNum} ${initialUnit} converts to ${returnNum} ${finalUnit}`
  };

}

module.exports = ConvertHandler;
