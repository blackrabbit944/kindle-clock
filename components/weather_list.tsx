import classNames from 'classnames';
import { get7DayWeather } from 'helper/hefeng';
import { useEffect, useState } from 'react';

import Weather from '../components/weather';

interface WeatherIn7DaysProps {
    cityId: string;
}

interface DailyOneProps {
    iconDay: string;
    textDay: string;
    textNight: string;
    tempMin: number;
    tempMax: number;
    fxDate: string;
}

interface DailyWeatherProps {
    weather: DailyOneProps;
}

const DailyWeather: React.FC<DailyWeatherProps> = ({ weather }) => {
    console.log('weather', weather);
    return (
        <div>
            <div className="">
                <div className="text-center">
                    <i
                        className={classNames('qi-' + weather.iconDay)}
                        style={{ fontSize: '5rem' }}
                    ></i>
                </div>
                <div className=" font-teko text-center">
                    <div className="text-base">
                        {weather.textDay == weather.textNight
                            ? weather.textDay + '转' + weather.textNight
                            : weather.textDay}
                    </div>
                    <div className="text-3xl">
                        {weather.tempMin}-{weather.tempMax}°C
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeatherIn7Days: React.FC<WeatherIn7DaysProps> = ({ cityId }) => {
    const [weatherList, setWeatherList] = useState<DailyOneProps[]>([]);
    const [error, setError] = useState<null | { message: string }>(null);
    const [loading, setLoading] = useState(true);

    //使用openweatherapi来查询天气
    useEffect(() => {
        if (!cityId) {
            return;
        }
        get7DayWeather({
            location: cityId
        })
            .then((weather_data) => {
                console.log('weather_data2', weather_data);
                setWeatherList(weather_data.daily);
                setLoading(false);
            })
            .catch((err) => {
                console.log('err', err);
                setError({
                    message: 'API请求出错'
                });
                setLoading(false);
            });
    }, [cityId]);

    console.log('weather', weatherList);

    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="flex justify-between flex-grow">
                <Weather cityId={cityId} />
                {weatherList.map((weatherone: DailyOneProps) => {
                    return <DailyWeather key={weatherone.fxDate} weather={weatherone} />;
                })}
            </div>
        );
    }
};
export default WeatherIn7Days;
