'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res, next) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum || !initUnit) {
      let message = ''
      if (!initNum && ! initUnit) {
        message = 'invalid number and unit'
      } else if (!initNum) {
        message = 'invalid number'
      } else {
        message = 'invalid unit'
      }
      res.send(message)
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      console.log(returnUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      console.log(string);
      res.json(
        {
          initNum: initNum, 
          initUnit: initUnit, 
          returnNum: returnNum, 
          returnUnit: returnUnit, 
          string: string
        }
      )
    }
  })

};
