import Head from 'next/head';

import Clock from '../components/clock';
import WeatherIn7Days from 'components/weather_list';
import LunarCalendar from '../components/lunar_calendar';
import City from '../components/city';
import { useState } from 'react';

export default function Home() {
    let [cityId, setCityId] = useState<string | number>('');

    return (
        <>
            <Head></Head>
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
