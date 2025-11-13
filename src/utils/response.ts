export interface LambdaResponse {
  statusCode: number;
  body: string;
}

export const successResponse = (data: any): LambdaResponse => ({
  statusCode: 200,
  body: JSON.stringify(data),
});

export const errorResponse = (statusCode: number, message: string): LambdaResponse => ({
  statusCode,
  body: JSON.stringify({ error: message }),
});

export const badRequest = (message: string): LambdaResponse =>
  errorResponse(400, message);

export const notFound = (message: string): LambdaResponse =>
  errorResponse(404, message);

export const methodNotAllowed = (): LambdaResponse =>
  errorResponse(405, "Método no permitido");

export const serverError = (message: string): LambdaResponse =>
  errorResponse(500, message);
