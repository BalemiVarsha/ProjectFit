import React, { useState } from 'react';
import './Pmlogin.css'
import { Link } from 'react-router-dom';
const Pmregister = () => {
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateUsername = () => {
        if (username.trim() === '') {
            setUsernameError('Username is required');
        } else if (!username.includes('@')) {
            setUsernameError('Username must contain @');
        } else {
            setUsernameError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };
    async function PMUser(event) {
        event.preventDefault()
        validateUsername();
        validatePassword();
        if (!usernameError && !passwordError) {
            // Submit the form or call API to register user
            const response = await fetch('http://localhost:5000/api/projectmanagercreation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, password
            }),
        })
        const data = await response.json()
    
        console.log(data)
          }
        
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border solid loginForm'>
                <img className='imglogo' src="/images/pf2.png"></img>
                {/* <h2>Login Page</h2> */}
                <br></br>
                <form onSubmit={PMUser}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            className='form-control rounded-0'
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            onBlur={validateUsername}/>
                             {usernameError && <div className="error">{usernameError}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            className='form-control rounded-0'
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword} />
                             {passwordError && <div className="error">{passwordError}</div>}

                    </div>
                    <br></br>
                    <div className='logsubmit'>
                        <button type="submit" className='btn btn-success  logsub w-100 rounded-0 mb-2 log'>Create Project Manager</button>
                        {/* <Link to= '/adminsucces' >  <button className='btn btn-success  logsub w-100 rounded-0 mb-2 log'>Create Admin User</button></Link><br></br> */}
                    </div>
                    {/* <div className='mb-1'>  <br></br>
                        <input type="checkbox" name="tick" id="tick" className='me-2' />
                        <label htmlFor="password">You are Agree with terms & conditions</label>
                    </div> */}
                </form>
            </div>
        </div>
        
    )


}
export default Pmregister;