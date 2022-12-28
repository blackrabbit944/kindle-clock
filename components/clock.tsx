import dayjs from 'dayjs';

export default function Clock({}) {
    let now = dayjs();

    let date = now.format('DD/MM/YYYY');
    let timer = now.format('HH:mm');

    return (
        <div>
            <div className="clock-font timer text-center">{timer}</div>
            <div className="clock-font dater text-center">{date}</div>
        </div>
    );
}
