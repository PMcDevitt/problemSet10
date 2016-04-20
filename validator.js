'use strict'

class Validator{

  constructor(input){
    if(!input) throw 'Input required'

    if(Object.keys(input).length === 0) throw 'Invalid input'
    this._input = input
  }

  valid(inputObj){
    if(!inputObj) throw 'Object required'

    if(Object.keys(inputObj).length === 0) throw 'Invalid Object'

    var config = this._input

    function checkProperties(accumulator, key){
        accumulator = accumulator && config.hasOwnProperty(key)
        && validateItem(inputObj[key], config[key])
        return accumulator
    }
    var returnBool = Object.keys(inputObj).reduce(checkProperties, true)

    function validateItem(inputItem,config){
        var returnValue = true
        returnValue =  (typeof inputItem === config.type)
        if(config.length && !(inputItem.length > config.length.greaterThan)){
            throw 'Text too short'
            return false
        }
        return returnValue
    }
    return returnBool

  }


}

module.exports = Validator
