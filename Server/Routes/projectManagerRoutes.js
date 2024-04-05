// routes/projectManagerRoutes.js

const express = require('express');
const router = express.Router();
const { createProjectManager } = require('../controllers/projectManagerController');

// Route for creating a project manager
router.post('/api/projectmanagercreation', createProjectManager);

module.exports = router;
