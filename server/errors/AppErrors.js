// Custom NotFoundError-class for handling null objetccs when using findById
// Resources:
//  - https://rclayton.silvrback.com/custom-errors-in-node-js
//  - https://www.codegrepper.com/code-examples/javascript/js+throw+custom+error
//

class ApppError extends Error {
  constructor(message = "Some Application Error occurred", status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.messsage = message;
    // Capturing stacktrace, excluding construtr call from t
    Error.captureStackTrace(this, this.constructor);

    this.status = status;
  }
}

class NotFoundError extends ApppError {
  constructor(resource, id, query = id) {
    super(`Resource ${resource} was not found.`, 404);
    this.message = `Resource ${resource} was not found`;
    this.data = { resource, id, query };
  }
}

// I do something like this to wrap errors from other frameworks.
// Correction thanks to @vamsee on Twitter:
// https://twitter.com/lakamsani/status/1035042907890376707
class InternalError extends ApppError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

module.exports = {
  ApppError,
  NotFoundError,
  InternalError,
};
