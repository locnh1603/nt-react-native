import {AuthRedirectError, isAuthRedirectError} from './auth-errors';

describe('auth-errors', () => {
  it('should create AuthRedirectError with default message', () => {
    const error = new AuthRedirectError();

    expect(error.name).toBe('AuthRedirectError');
    expect(error.message).toBe('Authentication required');
  });

  it('should detect auth redirect errors correctly', () => {
    expect(isAuthRedirectError(new AuthRedirectError())).toBe(true);
    expect(
      isAuthRedirectError(Object.assign(new Error('x'), {name: 'AuthRedirectError'})),
    ).toBe(true);
    expect(isAuthRedirectError(new Error('other'))).toBe(false);
  });
});
