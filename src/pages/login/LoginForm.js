import React, {useRef } from 'react'
const LoginForm = (props) => {
    const email = useRef()
    const password = useRef()


    return (
        <form className='login-form' onSubmit={(e) => (e.preventDefault(), props.formSubmitHandler(email.current.value, password.current.value,props.setError, props.setLoader,props.signedInWithEmailPaswword))}>

            <label htmlFor="email">Email </label>
            <input type="text" id='email' ref={email} placeholder='Enter Email' />
            <label htmlFor="password">Password </label>
            <input type="password" id='password' ref={password} placeholder='Password' />
            <p className='show-error'>{props.error}</p>
            <button className='login-btn'>Login</button>

        </form>
    )
}

export default LoginForm