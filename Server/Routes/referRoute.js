// routes/referRoutes.js
const express = require('express');
const router = express.Router();
const { refEmployees } = require('../controllers/referController');
const { authenticateToken } = require('../middlewares/auth');
router.post('/refer',authenticateToken, refEmployees);
//router.get('/referemployee/:projectId',getProjectAndReferredEmployees);
//router.get('/referred-employees', getReferredEmployees);
module.exports = router;
