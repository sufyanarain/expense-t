import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { forgotPawwsordFunc } from '../../Helpers/Firebase';

const ForgotPassword = () => {
    const [error, setError] = useState(null)
    const email = useRef(null);


    return (
        <div className='login-main-div'>
            <div className='login-right-sec'>
                <p className='login-heading'>Reset Password</p>
                <div className='login-form-div'>
                    <form className='login-form' onSubmit={(e) => (e.preventDefault(), forgotPawwsordFunc(email.current.value, setError))}>
                        <label htmlFor="email">Email </label>
                        <input type="text" id='email' ref={email} placeholder='Enter Email' />
                        <p className='show-error'>{error}</p>
                        <button className='login-btn'>Submit</button>
                    </form>
                    <div className='signup-link-div'><Link className='signup-link' to='/'>Go Back</Link> </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword