type AuthRedirectHandler = () => void;

let authRedirectHandler: AuthRedirectHandler | null = null;

export const setAuthRedirectHandler = (
  handler: AuthRedirectHandler | null,
): void => {
  authRedirectHandler = handler;
};

export const triggerAuthRedirect = (): void => {
  authRedirectHandler?.();
};
