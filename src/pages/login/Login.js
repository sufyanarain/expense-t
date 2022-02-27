import React, { useState, useContext } from 'react'
import LoginForm from './LoginForm'
import { Link, useHistory } from 'react-router-dom'
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from '../../components/firebase'
import './login.css'
import PasswordLessLogin from './PasswordLessLogin';
import LoaderContext from '../../components/context/LoaderContext';
import { authFbGoogleProvider, fetchUser, addNewUserDoc, addUserWithAutoGeneretedId, passwordLessLoginFunc } from '../../Helpers/Firebase';
import { formSubmitHandler } from './Helper';
import Loader from '../../components/loader/Loader';

const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [error, setError] = useState(null)
    const [loader, setLoader] = useContext(LoaderContext);
    const history = useHistory();

    const setUserDataToFirestore = async (user) => { // set user data to firestore from all providers
        const isUserDocExists = await fetchUser('users', user.uid); // get user data from firestore
        if (!isUserDocExists) {
            let userRef;
            try {
                userRef = await addUserWithAutoGeneretedId('users_profile', user.displayName, user.email);
            } catch (err) {
                console.log(err);
            }
            console.log(userRef);
            try {
                await addNewUserDoc('users', user.uid, user.displayName, user.email, userRef);
            } catch (err) {
                setLoader(false);
                history.push('/')
            }
        } else {
            history.push('/dashboard');
        }
        setLoader(false)
    }





    const signedInWithEmailPaswword = () => { // login with email and password
        history.push('/dashboard');
    }


    return (
        <div className='login-main-div'>
            {loader ? <Loader /> : null}
            <div className='login-right-sec'>
                <p className='login-heading'>Login</p>
                <div className='authproviders-div'>
                    <button className='google-btn' onClick={() => authFbGoogleProvider(GoogleAuthProvider, setUserDataToFirestore, setError, setLoader)}>Sign With Google</button>
                    <button className='facebook-btn' onClick={() => authFbGoogleProvider(FacebookAuthProvider, setUserDataToFirestore, setError, setLoader)}>Sign With Facebook</button>
                </div>
                <p>or</p>
                <div className='login-form-div'>
                    {showLoginForm ? <LoginForm formSubmitHandler={formSubmitHandler} setLoader={setLoader} setError={setError} signedInWithEmailPaswword={signedInWithEmailPaswword} error={error} /> :
                        <PasswordLessLogin passwordLessLoginFunc={passwordLessLoginFunc} />}
                </div>
                {showLoginForm ? <div className='forgot-password-div'><a onClick={() => setShowLoginForm(false)} className='show-form-link' >Passwordless Login</a></div> :
                    <div className='forgot-password-div'><a onClick={() => setShowLoginForm(true)} className='show-form-link' >Normal Login</a></div>}

                <div className='forgot-password-div'><Link className='forget-password-link' to='/forgotpassword'>Forgot Password ?</Link></div>
                <div className='signup-link-div'><span>Don't have account ? </span><Link className='signup-link' to='/signup'>Sign Up Now</Link> </div>
            </div>
        </div>
    )
}

export default Login
