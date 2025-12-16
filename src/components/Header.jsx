import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none mr-4">
                    <FaBars className="text-xl" />
                </button>
                <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FaUserCircle className="text-2xl" />
                    <span className="font-medium text-sm">{user?.name} (Admin)</span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition"
                    title="Logout"
                >
                    <FaSignOutAlt className="text-lg" />
                </button>
            </div>
        </header>
    );
};

export default Header;
