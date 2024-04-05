// controllers/projectManagerController.js

const ProjectManager = require('../models/projectmanager');

const createProjectManager = async (req, res) => {
    try {
        await ProjectManager.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
};

module.exports = { createProjectManager };
