// From https://help.pendo.io/resources/support-library/api/index.html?bash#browser-interaction
// TODO: PR to DefinitelyTyped

export interface Pendo {
  initialize({ visitor, account }: IdentityOptions): void;
  identify(visitorId: string, accountId?: string): void;
  identify({ visitor, account }: IdentityOptions): void;
  updateOptions(): void;
  track(name: string, metadata?: any): void;
  // TODO: other methods
}

export interface Visitor {
  id?: string;
  email?: string;
  role?: string;
  [key: string]: string | undefined;
}

export interface Account {
  id?: string;
  name?: string;
  planLevel?: string;
  planPrice?: string;
  creationDate?: string; // Unclear from docs if this should be Date
  [key: string]: string | undefined;
}

export interface IdentityOptions {
  visitor: Visitor;
  account: Account;
}

declare global  {
  interface Window { pendo: Pendo; }
}