export class HttpException extends Error {
  public statusCode: number;
  public override message: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Bad Request', 400);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', 401);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Forbidden', 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Not Found', 404);
  }
}
