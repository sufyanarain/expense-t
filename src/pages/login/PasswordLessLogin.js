import React, { useRef } from 'react'

const PasswordLessLogin = (props) => {
    const email = useRef()



    return (
        <form className='login-form' onSubmit={(e) => (e.preventDefault(), props.passwordLessLoginFunc(email.current.value))}>
            <label htmlFor="email">Email </label>
            <input type="text" id='email' ref={email} placeholder='Enter Email' />
            <button className='login-btn'>Submit</button>
        </form>
    )
}

export default PasswordLessLogin