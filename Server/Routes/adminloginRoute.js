// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminloginController');


// Route for admin login
router.post('/api/adminlogin', adminLogin);

module.exports = router;
