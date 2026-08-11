class BaseError extends Error {
  status: number;
  errors: unknown[];

  constructor(
    status: number,
    message: string,
    errors: unknown[] = [],
    name = "BaseError",
  ) {
    super(message);

    this.name = name;
    this.status = status;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(
    message: string,
    errors: unknown[] = [],
  ) {
    return new BaseError(400, message, errors);
  }

  static Unauthorized(
    message = "Unauthorized",
  ) {
    return new BaseError(401, message);
  }

  static Forbidden(
    message = "Forbidden",
  ) {
    return new BaseError(403, message);
  }

  static NotFound(
    message = "Not Found",
  ) {
    return new BaseError(404, message);
  }

  static Conflict(
    message: string,
    errors: unknown[] = [],
  ) {
    return new BaseError(409, message, errors);
  }

  static InternalServerError(
    message = "Internal Server Error",
  ) {
    return new BaseError(500, message);
  }
}

export default BaseError;