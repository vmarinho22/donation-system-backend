import { ZodError } from "zod";
import ApiError from "./errors/apiError";

export default function errorDistributor(error: unknown) {
  const returnedError = {
    message: '',
    code: 500,
  };

  if (error instanceof ApiError) {
    throw error;
  }

  if (error instanceof ZodError) {
    const errorData = error as ZodError;
    returnedError.message = `Invalid type of data: ${errorData.errors.map((error) => error.path.join('')).join(', ')}`;
  }

  returnedError.message = (error as Error).message;

  throw new ApiError(returnedError.code, returnedError.message);
}