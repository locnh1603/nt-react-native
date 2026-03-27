import {closeRealm, getRealm, initializeRealm} from '../../storage/realm/realm-client';

export class RealmCoreProvider {
  public async connect(): Promise<void> {
    await initializeRealm();
  }

  public disconnect(): void {
    closeRealm();
  }

  public isConnected(): boolean {
    try {
      const realm = getRealm();
      return !realm.isClosed;
    } catch {
      return false;
    }
  }
}
