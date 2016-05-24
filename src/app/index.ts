export * from './app';

import { AUTH_PROVIDERS, AUTH_STATE } from './auth';

export const APP_PROVIDERS = [
    AUTH_PROVIDERS,
    AUTH_STATE
];