export class AuthRedirectError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthRedirectError';
  }
}

export const isAuthRedirectError = (
  error: unknown,
): error is AuthRedirectError => {
  return (
    error instanceof AuthRedirectError ||
    (error instanceof Error && error.name === 'AuthRedirectError')
  );
};
