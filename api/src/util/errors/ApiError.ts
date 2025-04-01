import { InternalError } from "./InternalError";

export default class ApiError extends InternalError {
  constructor(message: string, code: number, description = 'Internal server error') {
    super(message, code, description)
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409)
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401)
  }
}

export class NotFound extends ApiError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class UnprocessableError extends ApiError{
  constructor(message: string) {
    super(message, 422)
  }
}