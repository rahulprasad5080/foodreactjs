import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
                {/* Left Side - Image (Optional/Hidden on mobile) - keeping simple for now as per ref requirement focusing on form */}
                <div className="w-full">
                    <h2 className="text-center text-3xl font-bold text-primary mb-2">StackFood</h2>
                    <p className="text-center text-gray-500 mb-6">Signin To Your Admin Panel</p>

                    {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="********"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox text-primary" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-gray-600 hover:text-primary">Forget Password</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-6 bg-orange-100 p-4 rounded-md text-sm text-gray-700">
                        <p><strong>Email:</strong> admin@admin.com (create this user)</p>
                        <p><strong>Password:</strong> 123456</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
