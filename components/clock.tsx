import dayjs from 'dayjs';

const Clock: React.FC = () => {
    const now = dayjs();
    const date = now.format('DD/MM/YYYY');
    const timer = now.format('HH:mm');
    return (
        <div>
            <div className="clock-font timer text-center">{timer}</div>
            <div className="clock-font dater text-center">{date}</div>
        </div>
    );
};
export default Clock;
