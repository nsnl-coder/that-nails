export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: 400 | 401 | 403 | 404 | 500) {
    super(message);
    this.statusCode = statusCode;
  }

  static get AUTH() {
    return {
      INVALID_USER_OR_PASSWORD: new ApiError('Invaid email or password', 400),
      JWT_MALFORMED: new ApiError('The token is not valid', 400),
      JWT_TOKEN_EXPIRED: new ApiError('The token is expired', 400),
      USER_NOT_LOGGED_IN: new ApiError('You are not login', 401),
      UNAUTHORIZED_USER: new ApiError('Your do not have permission.', 403),
      MISSING_REQUIRE_LOGIN_MIDDLEWARE: new ApiError(
        'You forget to add requireLogin middleware',
        500,
      ),
      PASSWORD_IS_NOT_CORRECT: new ApiError('Password is not correct', 403),
      REQUIRE_SUBSCRIPTION: new ApiError(
        'You need to be a subscriber to access this route',
        403,
      ),
    };
  }

  static get APP() {
    return {
      UNEXPECTED_ERROR: new ApiError('Unexpected error', 500),
      INVALID_ID: new ApiError('Id must be a number', 400),
    };
  }

  static get USER() {
    return {
      NOT_FOUND: new ApiError('Can not find user with provided payload', 404),
    };
  }
}
