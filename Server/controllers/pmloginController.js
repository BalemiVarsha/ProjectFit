// controllers/projectManagerAuthController.js

const jwt = require('jsonwebtoken');
const ProjectManager = require('../models/projectmanager');

const projectManagerLogin = async (req, res) => {
    try {
        const user = await ProjectManager.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (user) {
            const token = jwt.sign(
                { username: user.username ,password:user.password},
                'server123'
            );
            const expiration = 3 * 60 * 60 * 1000; // 3 hours
            res.cookie('token', token, { maxAge: expiration });
            return res.json({ status: 'ok', user: token });
        } else {
            return res.json({ status: 'error', user: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};

module.exports = { projectManagerLogin };
