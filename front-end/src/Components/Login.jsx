import React ,{useState}from 'react';
import './Login.css';
import {Link} from 'react-router-dom'

const Login = () => {


//------------------------------------------------------------------------------------------
  return (
    
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border solid loginForm'>
            <img className='imglogo' src="/images/pf1.png"></img>
            {/* <h2>Login Page</h2> */}
            <br></br>
            <form >
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" 
                      name='email'
                     autoComplete='off' 
                     placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <br></br>
                <div className='logsubmit'>
              {/* <Link to="/dashboard"> <button className='btn btn-success  logsub w-100 rounded-0 mb-2 log'>Log in</button> </Link> <br></br> */}
              <button  type="submit" className='btn btn-success  logsub w-100 rounded-0 mb-2'>Log in  </button>  <br></br>
              </div>
                <div className='mb-1'>  <br></br>
                    <input type="checkbox" name="tick" id="tick" className='me-2'/> 
                    <label htmlFor="password">You are Agree with terms & conditions</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;