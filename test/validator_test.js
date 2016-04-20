"use strict";
var expect = require('chai').expect;
var Validator = require('../validator')


describe('Given a Validator', function() {
  describe('When the input is invalid', function() {
    it('Then an error should be returned when no input', function() {
      function inputTest(){
        new Validator()
      }
      expect(inputTest).to.throw(/Input required/)
    })
    it('Then an error should be returned with an empty object', function() {
      function inputTest(){
        new Validator({})
      }
      expect(inputTest).to.throw(/Invalid input/)
    })
    it('Then the input should have a property', function(){
      function inputTest(){
        new Validator({testProperty: null})
      }
      expect(inputTest).to.not.throw()
    })

    it('then it should return true for a valid property type (string)', function() {
      function objectWithProperty(){
        new Validator({name: {type: 'string'}})
      }
      expect(objectWithProperty).to.not.throw()
    })

  })

  describe('when the valid function', function() {
    var validator = new Validator({testProperty: null})
    it('then it should throw an error with no input', function() {
      function testValid(){
        validator.valid()
      }
      expect(testValid).to.throw(/Object required/)
    })
    it('then it should throw an error with an empty object', function() {
      var validator = new Validator({testProperty: null})
      function testValid(){
        validator.valid({})
      }
      expect(testValid).to.throw(/Invalid Object/)
    })
    it('then it should not throw an error with a object with a property', function() {
      var validator = new Validator({name: {type: 'string'}})
      function testValid(){
        validator.valid({name: null})
      }
      expect(testValid).to.not.throw()
    })

    it('then it should return true with 2 objects with the same single property', function() {
      var validator = new Validator({name: {type: 'string'}})
      expect(validator.valid({name: "My Name"})).to.be.true
    })
    it('then it should return true when searching for properties in both objects', function() {
      var validator = new Validator({age: {type: 'number'}, name: {type: 'string'}})
      expect(validator.valid({name: 'string'})).to.be.true
    })

    it('then it should return true when searching for multiple properties present in both objects', function() {
      var validator = new Validator({age: {type: 'number'}, name: {type: 'string'}})
      expect(validator.valid({age: 10, name: 'My Name'})).to.be.true
    })
  })
  describe('When a string value is passed', function(){
      it('Then it should return true when the object types match', function(){
          var validator = new Validator({name :{type:'string', length: {greaterThan:6}}})
          expect(validator.valid({name: 'My Name'})).to.be.true
      })
      it('Then it should throw an error when thestring length is too short', function(){
          var validator = new Validator({name :{type:'string', length: {greaterThan:8}}})
          function checkLength(){
              validator.valid({name: 'My Name'})
          }
          expect(checkLength).to.throw(/Text too short/)
      })
      it('Then it should not throw an error when the string length is correct', function(){
          var validator = new Validator({name :{type:'string', length: {greaterThan:8}}})
          function checkLength(){
              validator.valid({name: 'My  Names'})
          }
          expect(checkLength).to.not.throw()
      })
     describe('When a number value is passed', function(){
      it('Then it should return false when a number is a string', function(){
          var validator = new Validator({
            name: {type: 'string', length: {greaterThan:8}},
            breed: {type: 'string', length: {greaterThan: 9}},
            age: {type: 'number'}
          })
          expect(validator.valid({age: 'My  Names'})).to.be.false
      })
      it('Then it should return true when a number is number', function(){
          var validator = new Validator({
            name: {type: 'string', length: {greaterThan:8}},
            breed: {type: 'string', length: {greaterThan: 9}},
            age: {type: 'number'}
          })
          expect(validator.valid({age: 10})).to.be.true
      })
    })
    describe('When multiple values are passed', function(){
        it('Then it should return true when valid inputs are passed', function(){
            var validator = new Validator({
              name: {type: 'string', length: {greaterThan:8}},
              breed: {type: 'string', length: {greaterThan: 4}},
              age: {type: 'number'}
            })
            expect(validator.valid({age: 10, name: '123456789', breed: '12345'})).to.be.true
        })
    })
      //
  })

})
