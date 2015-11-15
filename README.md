# Validating Database Entries

## Introduction

A common use case for interacting with the database is validating data before it is persisted. One such example of this would be given a model for Users, you may want to make sure that each user has a `firstName` and a `lastName` which are not blank strings.

In this exercise you will incrementally write a JavaScript class that handles property validations for a JavaScript Object. The exercise (until the stretch goals) will not require you to build a UI, but hopefully you can see the connection to an actual application. ***After each feature please make a commit of your work with a commit message that indicates what was implemented/achieved in the commit.*** This [post](https://github.com/erlang/otp/wiki/Writing-good-commit-messages) includes a good break down on what makes a good commit message.

You may choose to implement this in any way that you would like, so long as you use TDD to drive the coding and design. A sample test is provided here to make this activtiy's goals more concrete:

```
"use strict";
var expect = require('chai').expect;
var Validator = require('../validator');

describe('Validator', function () {
  var catValidations = {
    name: {type: 'string', length: {greaterThan: 0}},
    breed: {type: 'string', length: {greaterThan: 0}},
    age: {type: 'number'}
  };

  describe('validate', function () {
    it('returns true for a valid object', function () {
      var validCat = {
        name: 'Mittens',
        breed: 'American Shorthair',
        age: 10,
        weight: 13
      };
      var validator = new Validator(catValidations, validCat);

      expect(validator.validate()).to.be.true;
    });

    it('returns false for a valid object', function () {
      var invalidCat = {
        name: '',
        breed: 'American Shorthair',
        age: 10,
        weight: 13
      };
      var validator = new Validator(catValidations, invalidCat);

      expect(validator.validate()).to.be.false;
    });
  });
});
```

Again, you may choose to implement these features with any interface you would like. This sample code is only provided to give a better idea of what you are trying to do. You could take the approach of making a different class of validator for each type (e.g. string, number), use this approach of passing objects, whatever you want so long as it works for the stories.

## Stories/Features

### Feature 0

_Story_:

As a developer, I would like a simple system for validating JavaScript objects (or JSON documents), that returns a Boolean value indicating if the document is valid or not, so that I can know if an entity is ready to be persisted or not.

_Acceptance Criteria_:

1. Given a set of valid data and validation criteria for that data, the validator returns `true`.
1. Given a set of invalid data and validation criteria for that data (that is unmet), the validator returns `false`.

***Note:*** At the conclusion of this feature work, use `git` to checkpoint your work. As a reminder the steps here are:
  1. `git add [files you want to stage]`
  1. `git status` (make sure you have staged the correct files)
  1. `git commit -m "[commit message text goes in here]"`
  1. `git log` (to see commits being added)

### Feature 1

_Story_:

As a developer, I would like more robust system for validating JavaScript objects (or JSON documents), that returns `true` if the document is valid, otherwise it surfaces errors in a human-readable format. For the example in this `README` file, it _could_ say something like "Name must have more than 0 characters." Your could should work for Number and String datatypes.

_Acceptance Criteria_:

1. Given a set of valid data and validation criteria for that data, the validator returns `true`.
1. Given a set of invalid data and validation criteria for that data (that is unmet), the validator returns `false` but (by some mechanism) returns a set of human readable errors for the object. (_Hint_ This _could_ (or could not!) involve calling another method to retrieve populated errors)

## Stretch Goals

1. Create an Express CRUD application that includes your validator class as a dependency and uses it ensure that data for a given resource (e.g. `cats`), is valid before it is persisted. If data is invalid, re-render the same view that the user was already seeing and surface the human readable errors to them.
1. [Epic] Build a wrapper around [monk](https://github.com/Automattic/monk) that uses your validator code to abstract away both validations and the database calls. _Hint_: You are evolving towards something like [mongoose](http://mongoosejs.com/).

## Setup Steps

All setup work has been done for you. Once you have cloned this repository simply `cd` into the directory in which you cloned it and type `npm install`. A test file, `test/validator_test.js`, has been added for you. Feel free to change the name, but do so using [`git mv`](https://git-scm.com/docs/git-mv) so that history is preserved.

Configuration to run your tests just using `npm test` has been setup for you.

### Hints

If you read this far (as instructed) and decide to implement to the pattern above, you get some hints/reminders as a reward. If you want to iterate through an Object's properties you can use `in`, like so:

```
var myObj = {
  someProperty: 'some value!',
  anotherProp: 'yet another value!'
};

for (var prop in myObj) {
  console.log(prop);
  console.log(myObj[prop]);
}
```

You can assert if an object has a given property using [`Object.prototype.hasOwnProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty), like so:

```
var myObj = {
  someProperty: 'some value!',
  anotherProp: 'yet another value!'
};

console.log(myObj.hasOwnProperty('someProperty')); // true
console.log(myObj.hasOwnProperty('randomProp')); // false
```

## Reflection

- Why would a developer want to use Git?
- Compare and contrast Git to other source control tools you have used.
- What is a JavaScript class? Does it differ much from a constructor?
- What is one thing you and your pair did well today?
- What is one thing you and your pair did poorly today?
- Give each other one piece of praise about how your work went today.
