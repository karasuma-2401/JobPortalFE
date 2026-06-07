import { createContext } from 'react';
import type { AuthState } from './auth-utils';

export interface AuthContextType extends AuthState {
    logout: () => void;
    refreshAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
