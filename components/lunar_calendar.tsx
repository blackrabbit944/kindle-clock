import { Lunar } from 'lunar-javascript';

const LunarCalendar: React.FC = () => {
    const d = Lunar.fromDate(new Date());

    // const ly = d.getYearInChinese();
    const lm = d.getMonthInChinese();
    const ld = d.getDayInChinese();

    const ljieqi = d.getJieQi();
    const lfestival = d.getFestivals();

    const MAX_COUNT = 9;

    // 宜
    let yi_list = d.getDayYi();
    if (yi_list.length > MAX_COUNT) {
        yi_list = yi_list.slice(0, MAX_COUNT);
    }

    // 忌
    let ji_list = d.getDayJi();
    if (ji_list.length > MAX_COUNT) {
        ji_list = ji_list.slice(0, MAX_COUNT);
    }
    return (
        <div className="flex justify-start items-center border-4 border-gray-700">
            <div className="flex flex-col justify-center items-center px-4 bg-gray-700 text-white h-28 ">
                <div className="text-base">{lm}月</div>
                <div className="text-3xl">{ld}</div>
            </div>

            <div className="flex flex-col justify-start items-start border-l-4 border-gray-700 p-4">
                <div>
                    <span>{ljieqi}</span>
                    <span>{lfestival}</span>
                </div>

                <div className="flex justify-start items-center text-base">
                    <div className="text-white bg-green-500 rounded-full text-base py-2 mr-4 h-8 w-8 leading-4 text-center">
                        宜
                    </div>
                    <div className="flex justify-start gap-4">
                        {yi_list.map((one: string, i: number) => {
                            return (
                                <span className="" key={'yi-' + i}>
                                    {one}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-start items-center mt-4 text-base">
                    <div className="text-white bg-red-500 rounded-full text-base py-2 mr-4  h-8 w-8 leading-4 text-center">
                        忌
                    </div>
                    <div className="flex justify-start gap-4">
                        {ji_list.map((one: string, i: number) => {
                            return (
                                <span className="" key={'ji-' + i}>
                                    {one}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LunarCalendar;
