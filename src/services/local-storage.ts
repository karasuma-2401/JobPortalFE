const AUTH_STORAGE_EVENT = 'myjob-auth-storage-change';

export class LocalStorageService {
    private static notifyAuthChanged(key: string) {
        if (key !== 'me' || typeof window === 'undefined') return;

        window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
    }

    static saveValue<T>(key: string, value: T): boolean {
        try {
            const data = JSON.stringify(value);

            localStorage.setItem(key, data);

            this.notifyAuthChanged(key);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static getValue<T>(key: string): T | undefined {
        const value = localStorage.getItem(key);

        if (!value) return undefined;

        try {
            return JSON.parse(value) as T;
        } catch {
            return value as T;
        }
    }

    static removeValue(key: string) {
        localStorage.removeItem(key);

        this.notifyAuthChanged(key);
    }
}

export { AUTH_STORAGE_EVENT };
