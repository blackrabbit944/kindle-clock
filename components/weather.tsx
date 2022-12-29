import { useEffect, useState } from 'react';
import { getNowWeather, getNowWeatherPropsType } from 'helper/hefeng';
import classNames from 'classnames';

interface WeatherProps {
    cityId: string | number;
}
const Weather: React.FC<WeatherProps> = ({ cityId }) => {
    const [weather, setWeather] = useState<{ icon?: string }>({
        icon: ''
    });
    const [error, setError] = useState<null | { message: string }>(null);
    const [loading, setLoading] = useState(true);

    //使用openweatherapi来查询天气
    useEffect(() => {
        if (!cityId) {
            return;
        }
        getNowWeather({
            location: cityId
        })
            .then((weather_data) => {
                console.log('weather_data', weather_data);
                setWeather(weather_data.now);
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

    console.log('weather', weather);

    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="bg-black px-8 text-white">
                <div className="text-center">
                    <i
                        className={classNames('qi-' + weather.icon)}
                        style={{ fontSize: '5rem' }}
                    ></i>
                </div>
                <div className=" font-teko text-center">
                    <div className="text-base">{weather?.text}</div>
                    <div className="text-3xl">{Math.round(weather?.temp)}°C</div>
                </div>
            </div>
        );
    }
};
export default Weather;
