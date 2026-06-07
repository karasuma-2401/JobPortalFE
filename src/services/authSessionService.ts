import { TokenType } from '../bases/enums/jwt.enum';
import { type UserResponse } from '../types/auth';
import { CookiesService } from './cookieServices';
import { LocalStorageService } from './local-storage';

export const AuthSessionService = {
    saveAccessToken(accessToken: string) {
        localStorage.setItem(TokenType.ACCESS_TOKEN, accessToken);
    },

    getAccessToken() {
        return localStorage.getItem(TokenType.ACCESS_TOKEN);
    },

    saveRefreshToken(refreshToken: string) {
        CookiesService.saveToken(refreshToken, TokenType.REFRESH_TOKEN);
    },

    getRefreshToken() {
        return CookiesService.getToken(TokenType.REFRESH_TOKEN);
    },

    saveUser(user: UserResponse) {
        LocalStorageService.saveValue('me', user);
    },

    clear() {
        localStorage.removeItem(TokenType.ACCESS_TOKEN);
        CookiesService.removeCookie(TokenType.REFRESH_TOKEN);
        LocalStorageService.removeValue('me');
    },
};
