class AppError<T> {
  public readonly message: T[];
  public readonly statusCode: number;

  constructor(message: T[], statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
