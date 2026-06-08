const POST_AUTH_REDIRECT_KEY = 'jobseeker-post-auth-redirect';

export const savePostAuthRedirect = (path: string) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.sessionStorage.setItem(POST_AUTH_REDIRECT_KEY, path);
};

export const readPostAuthRedirect = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.sessionStorage.getItem(POST_AUTH_REDIRECT_KEY);
};

export const consumePostAuthRedirect = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    const path = readPostAuthRedirect();

    if (path) {
        window.sessionStorage.removeItem(POST_AUTH_REDIRECT_KEY);
    }

    return path;
};

export const buildJobApplyPath = (jobId: string) => `/job/${jobId}?apply=true`;
