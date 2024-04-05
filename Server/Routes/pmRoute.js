// routes/projectManagerAuthRoutes.js

const express = require('express');
const router = express.Router();
const { projectManagerLogin } = require('../controllers/pmloginController');

// Route for project manager login
router.post('/api/projectmanagerlogin', projectManagerLogin);

module.exports = router;
