import React, { useRef } from 'react'

const SignupForm = (props) => {

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const Cpassword = useRef(null)

    return (
        <form className='signup-form' onSubmit={(e) => (e.preventDefault(), props.formSubmitHandler(name.current.value, email.current.value, password.current.value, Cpassword.current.value, props.setError, props.setUserDataToFirestore, props.setLoader))}>
            <label htmlFor="name">Name </label>
            <input type="text" id='name' ref={name} placeholder='Enter Name' />
            <label htmlFor="email">Email </label>
            <input type="text" id='email' ref={email} placeholder='Enter Email' />
            <label htmlFor="password">Password </label>
            <input type="password" id='password' ref={password} placeholder='Password' />
            <input type="password" id='Cpassword' ref={Cpassword} placeholder='Confirm Password' />
            <p className='show-error'>{props.error}</p>
            <button className='signup-btn'>{props.loading ? 'Loading' : 'Signup'}</button>
        </form>
    )
}

export default SignupForm