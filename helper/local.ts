const checkLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return true;
    } else {
        console.log('localStorage不存在');
        return false;
    }
};

export const setCache = (name: string, value: any) => {
    if (checkLocalStorage()) {
        window.localStorage.setItem(name, value);
        return true;
    } else {
        return false;
    }
};

export const getCache = (name: string, default_value: any = null) => {
    if (checkLocalStorage()) {
        if (window.localStorage.getItem(name) === null) {
            return default_value;
        } else {
            return window.localStorage.getItem(name);
        }
    }
};
export const clearCache = (name: string) => {
    if (checkLocalStorage()) {
        window.localStorage.removeItem('name');
        return true;
    } else {
        return false;
    }
};
