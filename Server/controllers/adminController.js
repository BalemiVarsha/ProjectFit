// adminController.js

const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
  try {
    await Admin.create({
      username: req.body.username,
      password: req.body.password,
    });
   
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
};

module.exports = { createAdmin };

