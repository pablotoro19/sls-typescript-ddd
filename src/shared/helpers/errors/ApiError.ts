export class ApiError extends Error {
  public status: number;
  public errorCode: string;
  public errors?: any[];

  constructor({
    status,
    message,
    errorCode,
    errors,
  }: {
    status: number;
    message: string;
    errorCode: string;
    errors?: any[];
  }) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
