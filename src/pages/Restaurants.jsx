import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const { data } = await API.get('/restaurants');
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRestaurant = async (id) => {
        if (confirm('Are you sure you want to delete this restaurant? All associated foods should also be checked.')) {
            try {
                await API.delete(`/restaurants/${id}`);
                setRestaurants(restaurants.filter(r => r._id !== id));
            } catch (error) {
                alert('Failed to delete restaurant');
            }
        }
    };

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/restaurants', { name, address, image, rating: 5 });
            setRestaurants([...restaurants, data]);
            setShowModal(false);
            setName('');
            setAddress('');
            setImage('');
        } catch (error) {
            alert('Failed to add restaurant');
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Restaurants</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-orange-600"
                >
                    <FaPlus className="mr-2" /> Add Restaurant
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? <p>Loading...</p> : restaurants.map((restaurant) => (
                    <div key={restaurant._id} className="bg-white rounded-lg shadow overflow-hidden relative group">
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteRestaurant(restaurant._id)}>
                            <FaTrash className="text-red-500" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{restaurant.address}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Active</span>
                                <span className="text-yellow-500 font-bold">★ {restaurant.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Restaurant</h3>
                        <form onSubmit={handleAddRestaurant} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Restaurants;
