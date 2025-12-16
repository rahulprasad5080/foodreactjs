import { IconContext } from 'react-icons';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            </div>
            <div className={`p-4 rounded-full ${color} text-white`}>
                <IconContext.Provider value={{ size: '1.5em' }}>
                    {icon}
                </IconContext.Provider>
            </div>
        </div>
    );
};

export default StatsCard;
