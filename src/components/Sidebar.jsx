import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUtensils, FaStore } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
        { path: '/users', label: 'Users', icon: <FaUsers /> },
        { path: '/restaurants', label: 'Restaurants', icon: <FaStore /> },
        { path: '/foods', label: 'Foods', icon: <FaUtensils /> },
    ];

    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} bg-white min-h-screen shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
            <div className="h-16 flex items-center justify-center border-b overflow-hidden whitespace-nowrap">
                {isOpen ? (
                    <h1 className="text-2xl font-bold text-primary transition-opacity duration-300">StackFood</h1>
                ) : (
                    <h1 className="text-2xl font-bold text-primary">SF</h1>
                )}
            </div>
            <nav className="mt-6 flex-1">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <LinkWithActive
                                to={item.path}
                                icon={item.icon}
                                label={item.label}
                                isActive={location.pathname === item.path}
                                isOpen={isOpen}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const LinkWithActive = ({ to, icon, label, isActive, isOpen }) => (
    <Link
        to={to}
        className={`flex items-center ${isOpen ? 'justify-start px-6' : 'justify-center px-2'} py-3 text-sm font-medium transition-all duration-200 
      ${isActive ? 'text-primary bg-orange-50 border-r-4 border-primary' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}
       whitespace-nowrap overflow-hidden
      `}
        title={!isOpen ? label : ''}
    >
        <span className={`text-xl ${isOpen ? 'mr-4' : ''}`}>{icon}</span>
        <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            {isOpen && label}
        </span>
    </Link>
);

export default Sidebar;
