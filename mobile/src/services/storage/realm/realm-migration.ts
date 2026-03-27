import type Realm from 'realm';

export const REALM_SCHEMA_VERSION = 1;

export const handleRealmMigration: NonNullable<Realm.Configuration['migration']> = (
  oldRealm,
  _newRealm,
): void => {
  if (oldRealm.schemaVersion < 1) {
    // Initial schema setup. Future schema changes should be added in versioned blocks.
  }
};
