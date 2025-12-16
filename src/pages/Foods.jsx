import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [restRes, foodRes] = await Promise.all([
                API.get('/restaurants'),
                API.get('/foods')
            ]);

            setRestaurants(restRes.data);
            setFoods(foodRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        const foodRes = await API.get('/foods');
        setFoods(foodRes.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { name, description, price, image, restaurantId, category };

            if (isEdit) {
                await API.put(`/foods/${currentId}`, payload);
            } else {
                await API.post('/foods', payload);
            }

            await handleRefresh();
            closeModal();
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            try {
                await API.delete(`/foods/${id}`);
                setFoods(foods.filter(f => f._id !== id));
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const openAddModal = () => {
        setIsEdit(false);
        setName(''); setDescription(''); setPrice(''); setImage(''); setCategory('');
        if (restaurants.length > 0) setRestaurantId(restaurants[0]._id);
        setShowModal(true);
    }

    const openEditModal = (food) => {
        setIsEdit(true);
        setCurrentId(food._id);
        setName(food.name);
        setDescription(food.description);
        setPrice(food.price);
        setImage(food.image);
        setCategory(food.category);
        setRestaurantId(food.restaurant);
        setShowModal(true);
    }

    const closeModal = () => setShowModal(false);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Food Items</h2>
                <button
                    onClick={openAddModal}
                    className="bg-primary text-white px-4 py-2 rounded flex items-center hover:bg-orange-600"
                >
                    <FaPlus className="mr-2" /> Add Food
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                            <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                            <th className="px-5 py-3 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food) => (
                            <tr key={food._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-5 text-sm">
                                    <img src={food.image} alt={food.name} className="h-10 w-10 rounded-full object-cover" />
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap font-medium">{food.name}</p>
                                    <p className="text-gray-500 text-xs">{food.description.substring(0, 30)}...</p>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">${food.price}</p>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{food.category}</span>
                                </td>
                                <td className="px-5 py-5 text-sm text-right">
                                    <button onClick={() => openEditModal(food)} className="text-blue-600 hover:text-blue-900 mr-3"><FaEdit /></button>
                                    <button onClick={() => handleDelete(food._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{isEdit ? 'Edit Food' : 'Add New Food'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded p-2" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Price</label>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Category</label>
                                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded p-2" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Restaurant</label>
                                <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)} className="w-full border rounded p-2" required>
                                    {restaurants.map(r => (
                                        <option key={r._id} value={r._id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border rounded p-2" required />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Foods;
