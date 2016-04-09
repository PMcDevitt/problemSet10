# Performing Validations

## Approach

A common use case for interacting with the data is validating the data meets the requirements of your system. One example of this would be given a model (class/constructor) for users, you ensure that each user has a `firstName` and a `lastName` which are not simply blank strings. Another validation of this same data could be that `firstName` and `lastName` do not contain any special characters (like `@`, `+`, etc.).

In this exercise you will write a JavaScript class (or multiple classes) that handle validations for a JavaScript Object. The exercise (until the stretch goals) will not require you to build a UI, but hopefully you can see the connection to an actual application.

***After each story make a commit of your work with a commit message that indicates what was implemented/achieved.*** Reference [this guide](https://github.com/erlang/otp/wiki/Writing-good-commit-messages) on writing good commit messages as you author your commit messages.

You may choose to implement this work in any way that you would like, so long as you use TDD to drive the coding and design.

This code is an example of one approach for this problem:

```
"use strict";
var expect = require('chai').expect;
var Validator = require('../validator');

describe('Validator', function () {
  describe('valid', function () {
    var catValidations = {
      name: {type: 'string', length: {greaterThan: 0}},
      breed: {type: 'string', length: {greaterThan: 0}},
      age: {type: 'number'}
    };
    var catValidator;

    beforeEach(function () {
      catValidator = new Validator(catValidations);      c
    });

    it('returns true for a valid object', function () {
      var validCat = {
        name: 'Mittens',
        breed: 'American Shorthair',
        age: 10,
        weight: 13
      };

      expect(catValidator.valid(validCat)).to.be.true;
    });

    it('returns false for an invalid object', function () {
      var missingNameCat = {
        name: '',
        breed: 'American Shorthair',
        age: 10,
        weight: 13
      };

      expect(catValidator.valid(missingNameCat)).to.be.false;
    });
  });
});
```

Again, you may choose to implement these features with any interface you would like. ***This sample code is only provided to give a better idea of what you are trying to do and is not a prescription for an approach***. You could take the approach of making a different class of validator for each type (e.g. string, number), use this approach of passing objects, whatever you want so long as it works for the stories.

The inspiration for this problem set comes from Ruby on Rail's [`ActiveModel::Validations` module](http://api.rubyonrails.org/classes/ActiveModel/Validations.html), which offers a simple, but powerful [Domain Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language) for handling validations.

## Problems

### Feature 0

_Story_:

As a developer, I would like a simple system for validating JavaScript objects, that returns a Boolean value indicating if the document is valid or not, so that I can know if an entity is ready to be persisted or not.

_Acceptance Criteria_:

1. Given an instance of the validator, when a set of valid data is provided, then the validator returns `true`.
1. Given an instance of the validator, when a set of invalid data is provided, then the validator returns `false`.

***Note:*** At the conclusion of this feature work, use `git` to checkpoint your work. As a reminder the steps here are:
  1. `git add [files you want to stage]`
  1. `git status` to make sure you have staged the correct files
  1. `git commit -m "[commit message text here]"`
  1. (optional) `git log` to see list of commits

### Feature 1

_Story_:

As a developer, I would like a robust system for validating JavaScript objects which surfaces errors in a human-readable format, so that I can inform humans of the problems with their data. An example would read "Name must have more than 0 characters."

_Acceptance Criteria_:

1. Given a set of valid data and validation criteria for that data, the validator returns `true`.
1. Given a set of invalid data and validation criteria for that data (that is unmet), the validator returns `false` but (by some mechanism) returns a set of human readable errors for the object. Your code should work for Number and String datatypes. _Hint:_ One approach is to make something similar to `ActiveModel::Validations`, which adds an additional property to the object being validated to [list the errors](http://api.rubyonrails.org/classes/ActiveModel/Errors.html), this (Ruby code) looks like:

  ```
  person = Person.new
  person.validate!            # => ["cannot be nil"]
  person.errors.full_messages # => ["name cannot be nil"]
  ```

### Stretch Exercise 0

Use TDD to create an Express CRUD application that includes your validator class as a dependency. How much integration testing is appropriate for this type of task?

The easiest way to do this will likely be to copy/paste your code and tests into the new application. Your CRUD application should use the validator code you wrote to make sure a given resource (e.g. `cats`), is valid before it is persisted. If data is invalid, re-render the same view that the user was already seeing and surface the human readable errors to them.

### Stretch Exercise 1

This is an [*epic* stretch](http://imgur.com/P0P6g20) exercise.

Use TDD to build a wrapper around [monk](https://github.com/Automattic/monk) that uses your validator code to abstract away both validations and the database calls. _Hint_: You are evolving towards something like [mongoose](http://mongoosejs.com/) or [`ActiveRecord`](http://guides.rubyonrails.org/active_record_basics.html).

## Setup Steps

All setup work has been done for you. Once you have cloned this repository simply `cd` into the directory in which you cloned it and type `npm install`. A test file, `test/validator_test.js`, has been added for you. Feel free to change the name, but do so using [`git mv`](https://git-scm.com/docs/git-mv) so that history is preserved.

Configuration to run your Mocha tests using `npm test` has also been provided for you.

### Hints

If you read this far (as instructed) you get some hints/reminders as a reward. If you want to iterate through an Object's properties you can use `in`, like so:

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

As always, stop a few minutes before the end of the day and, working with your pair, answer the following questions:

1. Why would a developer want to use Git?
1. Compare and contrast Git to other source control tools you have used.
1. What is a JavaScript class? Is it different than a constructor?
1. What is one thing you and your pair did well today?
1. What is one thing you and your pair did poorly today?
1. Give each other one piece of praise about how your work went today.
