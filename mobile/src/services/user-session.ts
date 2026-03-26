import * as Keychain from 'react-native-keychain';
import {UserProfile} from '../models/user';

const KEYCHAIN_SERVICE = 'react-native-starter.auth.session';
const KEYCHAIN_ACCOUNT = 'auth-token';
const DEFAULT_SESSION_DURATION_MS = 60 * 60 * 1000;

export interface UserSession {
  token: string;
  user: UserProfile | null;
  expiresAt: number;
}

interface StoreUserSessionInput {
  token: string;
  user?: UserProfile | null;
  sessionDurationMs?: number;
}

interface StoredUserSession {
  token: string;
  user: UserProfile | null;
  expiresAt: number;
}

const parseStoredSession = (
  rawSession: string,
): StoredUserSession | null => {
  try {
    const parsedSession = JSON.parse(rawSession) as Partial<StoredUserSession>;
    if (
      typeof parsedSession.token !== 'string' ||
      typeof parsedSession.expiresAt !== 'number'
    ) {
      return null;
    }

    return {
      token: parsedSession.token,
      user: parsedSession.user ?? null,
      expiresAt: parsedSession.expiresAt,
    };
  } catch {
    return null;
  }
};

const readStoredSession = async (): Promise<StoredUserSession | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    if (!credentials) {
      return null;
    }

    return parseStoredSession(credentials.password);
  } catch {
    return null;
  }
};

export const storeUserSession = async ({
  token,
  user,
  sessionDurationMs = DEFAULT_SESSION_DURATION_MS,
}: StoreUserSessionInput): Promise<void> => {
  const expiresAt = Date.now() + sessionDurationMs;
  const payload: StoredUserSession = {
    token,
    user: user ?? null,
    expiresAt,
  };

  try {
    await Keychain.setGenericPassword(
      KEYCHAIN_ACCOUNT,
      JSON.stringify(payload),
      {
        service: KEYCHAIN_SERVICE,
      },
    );
  } catch {
    // Intentionally swallow keychain write failures so auth can continue.
  }
};

export const getUserSession = async (): Promise<UserSession | null> => {
  const session = await readStoredSession();

  if (!session) {
    await clearUserSession();
    return null;
  }

  if (Date.now() >= session.expiresAt) {
    await clearUserSession();
    return null;
  }

  return session;
};

export const refreshUserSessionExpiry = async (
  sessionDurationMs: number = DEFAULT_SESSION_DURATION_MS,
): Promise<void> => {
  try {
    const session = await readStoredSession();
    if (!session) {
      return;
    }

    const refreshedSession: StoredUserSession = {
      ...session,
      expiresAt: Date.now() + sessionDurationMs,
    };

    await Keychain.setGenericPassword(
      KEYCHAIN_ACCOUNT,
      JSON.stringify(refreshedSession),
      {
        service: KEYCHAIN_SERVICE,
      },
    );
  } catch {
    // Intentionally swallow keychain write failures so request flow can continue.
  }
};

export const updateUserSessionUser = async (user: UserProfile): Promise<void> => {
  try {
    const session = await readStoredSession();
    if (!session) {
      return;
    }

    const updatedSession: StoredUserSession = {
      ...session,
      user,
    };

    await Keychain.setGenericPassword(
      KEYCHAIN_ACCOUNT,
      JSON.stringify(updatedSession),
      {
        service: KEYCHAIN_SERVICE,
      },
    );
  } catch {
    // Intentionally swallow keychain write failures so profile flow can continue.
  }
};

export const clearUserSession = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: KEYCHAIN_SERVICE,
    });
  } catch {
    // Intentionally swallow keychain clear failures.
  }
};
