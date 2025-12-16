# Backend Update Request

Since I cannot access the backend folder directly right now, please add the following files to your **Node.js Backend** (`c:\Users\rahul\OneDrive\Desktop\node js`) to enable the Dashboard Statistics.

### 1. Create `src/controllers/adminController.js`
```javascript
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalFoods = await Food.countDocuments();

    res.json({
      totalUsers,
      totalRestaurants,
      totalFoods,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashboardStats };
```

### 2. Create `src/routes/adminRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', protect, admin, getDashboardStats);

module.exports = router;
```

### 3. Update `server.js`
Add this line with the other route imports:
```javascript
app.use('/api/admin', require('./src/routes/adminRoutes'));
```
