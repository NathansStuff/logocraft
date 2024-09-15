import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  message = 'Not Found';
  error = null;

  constructor(message: string, error?: string | null) {
    super(message, 404, error);
  }
}
