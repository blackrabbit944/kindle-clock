import Modal from 'components/common/modal';
import { CityOnePropsType, getCity } from 'helper/hefeng';
import { getCache, setCache } from 'helper/local';
import { useEffect, useState } from 'react';

interface CityProps {
    setCityId: (city_id: string) => void;
}

interface CityOneInterface {
    location: string;
    name: string;
}

const City: React.FC<CityProps> = (props) => {
    const { setCityId } = props;

    // const [loading, setLoading] = useState(false);
    const [kw, setKw] = useState<string>('');
    const [cityList, setCityList] = useState<CityOnePropsType[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [city, setCity] = useState<CityOneInterface>({
        location: '',
        name: ''
    });

    const setCityAll = (cityone: CityOneInterface) => {
        setCache(
            'kindle-city',
            JSON.stringify({
                location: cityone.location,
                name: cityone.name
            })
        );
        setCity(cityone);
        setCityId(cityone.location);
    };

    const selectCity = (cityone: CityOneInterface) => {
        setCityAll(cityone);
        setShowModal(false);
    };

    const searchCity = async (name: string) => {
        if (!name) {
            return null;
        }
        const data = await getCity({
            location: name
        });

        setCityList(data);
    };

    const toggleCityModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        let cache_city = JSON.parse(getCache('kindle-city'));
        console.log('cache_city', cache_city);
        if (cache_city) {
            setCity(cache_city);
        } else {
            cache_city = {
                location: '101300101',
                name: '南宁'
            };
        }
        setCityAll(cache_city);
        return;
    }, []);

    return (
        <div className="flex justify-start items-center py-2">
            <h2 className="font-bold text-xl px-4">{city?.name}</h2>
            <div>
                <button onClick={toggleCityModal}>切换城市</button>
            </div>
            <Modal
                title={'切换城市'}
                width={'400'}
                visible={showModal}
                onClose={() => setShowModal(false)}
            >
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <input
                            className="border-2 border-gray-900 py-1.5 text-sm px-4 flex-grow mr-2 rounded-md"
                            value={kw}
                            placeholder={'输入关键词搜索'}
                            onChange={(e) => {
                                setKw(e.target.value);
                            }}
                        />
                        <button className="btn btn-primary" onClick={searchCity.bind({}, kw)}>
                            搜索
                        </button>
                    </div>

                    <div className="my-4">
                        {cityList.map((cityone) => {
                            return (
                                <div
                                    key={cityone.location}
                                    onClick={() => {
                                        selectCity({
                                            location: cityone.location,
                                            name: cityone.name
                                        });
                                    }}
                                    className="py-1 border-b-2 border-gray-200"
                                >
                                    {cityone.name}
                                    {cityone.adm1 ? (
                                        <span className="text-gray-400 text-sm ml-4">
                                            {cityone.adm1}
                                        </span>
                                    ) : null}
                                    {cityone.adm2 ? (
                                        <span className="text-gray-400 text-sm">
                                            - {cityone.adm2}
                                        </span>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default City;
