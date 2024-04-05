// adminRoutes.js

const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/adminController');
const { authenticateToken } = require('../middlewares/auth');

// Routes
router.post('/api/admincreation', createAdmin);

module.exports = router;
