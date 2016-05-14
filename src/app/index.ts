// App
export * from './app';

import { AuthState } from './state/authState';

// Application wide providers
export const APP_PROVIDERS = [
  AuthState
];