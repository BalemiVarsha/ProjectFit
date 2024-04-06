import React, { useState } from 'react';
import './Projmlog.css'; // Import CSS file for styling

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src='/images/3.png' alt="Login" />
            </div>
            <div className="login-right">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                {/* <img src='/images/3.png' alt="Login" /> */}
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name='email' 
                            autoComplete='off' 
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>Log in</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
