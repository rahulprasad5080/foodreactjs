import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import DashboardChart from '../components/DashboardChart';
import { FaUsers, FaStore, FaUtensils, FaShoppingBag } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRestaurants: 0,
        totalFoods: 0,
        totalOrders: 0, // Mock for now
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/admin/dashboard-stats');
                setStats({ ...data, totalOrders: 12 }); // Mock orders
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-gray-500">Overview of your system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={<FaShoppingBag />}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<FaUsers />}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Restaurants"
                    value={stats.totalRestaurants}
                    icon={<FaStore />}
                    color="bg-orange-500"
                />
                <StatsCard
                    title="Foods"
                    value={stats.totalFoods}
                    icon={<FaUtensils />}
                    color="bg-red-500"
                />
            </div>

            {/* Graphic Chart */}
            <DashboardChart />
        </Layout>
    );
};

export default Dashboard;
