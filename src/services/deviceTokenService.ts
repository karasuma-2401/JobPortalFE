import { privateApi } from '../api/api';

export interface DeviceToken {
    id: string;
    token: string;
    deviceName?: string;
    browser?: string;
    platform?: string;
    createdAt: string;
    lastUsedAt?: string;
}

export const DeviceTokenService = {
    getDeviceTokens: async (): Promise<DeviceToken[]> => {
        const response = await privateApi.get('/device-tokens');
        return response.data || [];
    },
    registerDeviceToken: async (token: string): Promise<void> => {
        const deviceInfo = getDeviceInfo();
        return await privateApi.post('/device-tokens', {
            token,
            deviceName: deviceInfo.deviceName,
            browser: deviceInfo.browser,
            platform: deviceInfo.platform,
        });
    },
    unregisterDeviceToken: async (token: string): Promise<void> => {
        return await privateApi.delete('/device-tokens', {
            data: { token },
        });
    },
    unregisterAllDeviceTokens: async (): Promise<void> => {
        return await privateApi.delete('/device-tokens');
    },
};

function getDeviceInfo() {
    return {
        deviceName: `${getBrowserName()} on ${getOSName()}`,
        browser: getBrowserName(),
        platform: getOSName(),
    };
}

function getBrowserName(): string {
    const ua = navigator.userAgent;

    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';

    return 'Unknown';
}

function getOSName(): string {
    const ua = navigator.userAgent;

    if (ua.indexOf('Windows') > -1) return 'Windows';
    if (ua.indexOf('Mac') > -1) return 'macOS';
    if (ua.indexOf('Linux') > -1) return 'Linux';
    if (ua.indexOf('Android') > -1) return 'Android';
    if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';

    return 'Unknown';
}
