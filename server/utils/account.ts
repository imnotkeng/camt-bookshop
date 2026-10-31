// The demo account. Only a SHA-256 of the password is stored — the password itself is
// never in this repository.
export const DEMO_ACCOUNT = {
  email: 'reader@camt.example',
  passwordSha256: '10d60a7a6b9a6157703a3ca5a45bdd4da74bb2166fe0c39ed4b60bfcd10c25d8',
} as const;
