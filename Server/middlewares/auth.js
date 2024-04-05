// // authController.js

// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ status: 'error', error: 'Unauthorized' });

//   jwt.verify(token, 'server123', (err, user) => {
//     if (err) return res.status(403).json({ status: 'error', error: 'Forbidden' });
//     req.user = user;
//     next();
//   });
// };

// module.exports = { authenticateToken };


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ status: 'error', error: 'Unauthorized' });

    jwt.verify(token, 'server123', (err, decoded) => {
      if (err) return res.status(403).json({ status: 'error', error: 'Forbidden' });
      req.user = decoded;
      next();
  });
};

module.exports = { authenticateToken };
