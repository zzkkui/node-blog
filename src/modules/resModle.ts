type DataType = number | string | Record<string, any>;
type MessageType = string;

class BaseModel {
  protected data;
  protected message;

  constructor(data?: DataType, message?: MessageType) {
    if (typeof data === "string") {
      this.message = data;
      data = undefined;
      message = undefined;
    }
    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

export class SuccessModel extends BaseModel {
  protected error;

  constructor(data?: DataType, message?: MessageType) {
    super(data, message);
    this.error = 0;
  }
}

export class ErrorModel extends BaseModel {
  protected error;

  constructor(message: MessageType, data?: DataType) {
    super(data, message);
    this.error = -1;
  }
}
