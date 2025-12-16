import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const { data } = await API.get('/users/profile');
                setUser(data);
            } catch (error) {
                setUser(null);
            }
            setLoading(false);
        };
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await API.post('/auth/login', { email, password });
        setUser(data);
    };

    const logout = () => {
        setUser(null);
        // Note: To fully logout, a backend endpoint clearing the cookie is required.
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
