// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');

// const adminLogin = async (req, res) => {
//     try {
//         console.log('Received login request:', req.body);

//         const user = await Admin.findOne({
//             username: req.body.username,
//             password: req.body.password,
//         });

//         if (user) {
//             const token = jwt.sign(
//                 { username: user.username, password: user.password },
//                 'server123'
//             );

//             // Set cookie with expiration time of 3 hours (in milliseconds)
//             const expiration = 3 * 60 * 60 * 1000; // 3 hours
//             res.cookie('token', token, { maxAge: expiration });

//             console.log('Cookie set:', token);
//             return res.json({ status: 'ok', user: token });
//         } else {
//             console.log('Login failed: Invalid username or password');
//             return res.json({ status: 'error', user: false });
//         }
//     } catch (err) {
//         console.error('Error occurred:', err);
//         return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
//     }
// };

// module.exports = { adminLogin };

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminLogin = async (req, res) => {
    try {
        console.log('Received login request:', req.body);

        const user = await Admin.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (user) {
            const token = jwt.sign(
                { username: user.username, password: user.password },
                'server123'
            );

            console.log('Token generated:', token);
            return res.json({ status: 'ok', user: token });
        } else {
            console.log('Login failed: Invalid username or password');
            return res.status(401).json({ status: 'error', error: 'Unauthorized' });
        }
    } catch (err) {
        console.error('Error occurred:', err);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};

module.exports = { adminLogin };
