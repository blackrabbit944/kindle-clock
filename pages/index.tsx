import WeatherIn7Days from 'components/weather_list';
import Head from 'next/head';
import { useState } from 'react';

import City from '../components/city';
import Clock from '../components/clock';
import LunarCalendar from '../components/lunar_calendar';

export default function Home() {
    const [cityId, setCityId] = useState<string>('');

    return (
        <>
            <Head>
                <title>Kindle Clock</title>
            </Head>
            <main>
                <div className="p-8">
                    <div className="flex justify-between items-center gap-8">
                        <Clock />
                        <div>
                            <LunarCalendar />
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-700 my-8">
                        <City setCityId={setCityId} />
                        <div className="flex justify-between border-t-2 border-gray-700 border-r-2 pr-6">
                            <WeatherIn7Days cityId={cityId} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
