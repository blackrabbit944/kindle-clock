import { useEffect, useState } from 'react';

interface WeatherProps {
    lat: number | string;
    lon: number | string;
    apiKey: string;
}

const Weather: React.FC<WeatherProps> = ({ lat, lon, apiKey }) => {
    interface weatherState {
        name: string;
        weather: any[];
        main: any;
    }

    const [weather, setWeather] = useState<null | weatherState>(null);
    const [error, setError] = useState<null | { message: string }>(null);
    const [loading, setLoading] = useState(true);

    //使用openweatherapi来查询天气
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setWeather(result);
                    setLoading(false);
                },
                (error) => {
                    setError(error);
                    setLoading(false);
                }
            );
    }, [lat, lon, apiKey]);

    console.log('weather', weather);

    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="text-center text-2xl capitalize">{weather?.name}</div>
                <div className="flex justify-between">
                    <div className="mr-8">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                            className="w-32"
                        />
                    </div>
                    <div className="text-3xl font-teko flex flex-col justify-center items-start">
                        <div className="weather-temp">{Math.round(weather?.main.temp)}°C</div>
                        <div className="weather-temp">{weather?.weather[0]['main']}</div>
                    </div>
                </div>
            </div>
        );
    }
};
export default Weather;
