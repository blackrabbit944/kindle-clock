const HEFENG_API_KEY = '25deafd3524f4f029519c0db575c77f1';
enum UnitType {
    M = 'm',
    I = 'i'
}
enum LanguageType {
    ZH = 'zh',
    EN = 'en'
}

//拼接get参数
const getApiUrl = (api_url_base: string, params: object) => {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach((key) => paramsArray.push(key + '=' + params[key]));
    if (api_url_base.search(/\?/) === -1) {
        api_url_base += '?' + paramsArray.join('&');
    } else {
        api_url_base += '&' + paramsArray.join('&');
    }
    return api_url_base;
};

export interface getNowWeatherPropsType {
    location: string | number;
    lang?: string;
    unit?: UnitType;
}

export const getNowWeather = async (props: getNowWeatherPropsType) => {
    const { location, lang = LanguageType.ZH, unit = UnitType.M } = props;

    let result = await fetch(
        getApiUrl('https://devapi.qweather.com/v7/weather/now', {
            location,
            key: HEFENG_API_KEY,
            lang,
            unit
        })
    );

    let data = await result.json();

    console.log('result-data', data);
    return data;
};

export interface getCityPropsType {
    location: string;
}

export interface CityOnePropsType {
    location: string;
    name: string;
    adm2?: string;
    adm1?: string;
}

export const getCity = async (props: getCityPropsType): CityOnePropsType[] => {
    const { location } = props;

    let result = await fetch(
        getApiUrl('https://geoapi.qweather.com/v2/city/lookup', {
            location,
            key: HEFENG_API_KEY
        })
    );

    let data = await result.json();

    let citys = [];
    if (data.location) {
        data.location.map((locationone) => {
            city = {
                location: locationone.id,
                name: locationone.name,
                adm1: locationone.adm1,
                adm2: locationone.adm2
            };
            citys.push(city);
        });
    }
    console.log('citys', citys);

    return citys;
};

export interface get7DayWeatherPropsType {
    location: string | number;
    lang?: string;
    unit?: UnitType;
}

export const get7DayWeather = async (props: get7DayWeatherPropsType) => {
    const { location, lang = LanguageType.ZH, unit = UnitType.M } = props;

    //api地址是: https://api.qweather.com/v7/weather/7d
    let result = await fetch(
        getApiUrl('https://devapi.qweather.com/v7/weather/7d', {
            location,
            key: HEFENG_API_KEY,
            lang,
            unit
        })
    );

    let data = await result.json();

    console.log('result-data', data);
    return data;
};
