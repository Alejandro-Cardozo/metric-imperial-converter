const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Numeric Input Assertions', function() {
    // #1
    test('should correctly read a whole number input', function() {
      assert.isNumber(convertHandler.getNum('10'), '10 is a valid number');
    });
    // #2
    test('should correctly read a decimal number input', function() {
      assert.isNumber(convertHandler.getNum('1.5'), '1.5 is a valid number');
    });
    // #3
    test('should correctly read a fractional input', function() {
      assert.isNumber(convertHandler.getNum('1/2'), '1/5 is a valid number');
    });
    // #4
    test('should correctly read a fractional input with a decimal', function() {
      assert.isNumber(convertHandler.getNum('1.5/1.2'), '1.5/1.2 is a valid number');
    });
    // #5
    test('should correctly return an error on a double-fraction', function() {
      assert.isUndefined(convertHandler.getNum('1/2/3'), '1/2/3 is a valid number');
    });
    // #6
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
      assert.strictEqual(convertHandler.getNum(''), 1, '1 is returned when no number is provided');
    });
  });
  suite('Unit Input Assertions', function() {
    // #7
    test('should correctly read each valid input unit', function() {
      assert.strictEqual(convertHandler.getUnit('L'), 'L', 'L is a valid unit');
      assert.strictEqual(convertHandler.getUnit('gal'), 'gal', 'gal is a valid unit');
      assert.strictEqual(convertHandler.getUnit('km'), 'km', 'km is a valid unit');
      assert.strictEqual(convertHandler.getUnit('mi'), 'mi', 'mi is a valid unit');
      assert.strictEqual(convertHandler.getUnit('lbs'), 'lbs', 'lbs is a valid unit');
      assert.strictEqual(convertHandler.getUnit('kg'), 'kg', 'kg is a valid unit');
    });
    // #8
    test('should correctly return an error for an invalid input unit', function() {
      assert.isUndefined(convertHandler.getUnit('g'), 'g is an invalid unit');
      assert.isUndefined(convertHandler.getUnit('in'), 'in is an invalid unit');
      assert.isUndefined(convertHandler.getUnit('m'), 'm is an invalid unit');
    });
    // #9
    test('should return the correct return unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'L returns gal');
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'gal returns L');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'km returns mi');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'mi returns km');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'lbs returns kg');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'kg returns lbs');
    });
    // #10
    test('should correctly return the spelled-out string unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', 'L stands for liters');
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'gal stands for gallons');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'km stands for kilometers');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', 'mi stands for miles');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'lbs stands for pounds');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'kg stands for kilograms');
    });
  });
  suite('Convert Assertions', function() {
    // #11
    test('should correctly convert gal to L', function() {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
    });
    // #12
    test('should correctly convert L to gal', function() {
      assert.approximately(convertHandler.convert(3.78541, 'L'), 1, 0.1);
    });
    // #13
    test('should correctly convert mi to km', function() {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    });
    // #14
    test('should correctly convert km to mi', function() {
      assert.approximately(convertHandler.convert(1.60934, 'km'), 1, 0.1);
    });
    // #15
    test('should correctly convert lbs to kg', function() {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
    });
    // #16
    test('should correctly convert kg to lbs', function() {
      assert.approximately(convertHandler.convert(0.453592, 'kg'), 1, 0.1);
    });
  });
});