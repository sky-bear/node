class BaseModel {
  constructor(data, message) {
    if (typeof data === "string") {
      this.message = data;
      this.data = null;
    } else {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

class SuccessModule extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModule,
  ErrorModel
};
