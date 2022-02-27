import React, { useState, useContext } from 'react'
import SignupForm from './SignupForm'
import { Link, useHistory } from 'react-router-dom'
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { authFbGoogleProvider, fetchUser, addNewUserDoc, addUserWithAutoGeneretedId } from '../../Helpers/Firebase';
import LoaderContext from '../../components/context/LoaderContext';
import Loader from '../../components/loader/Loader';
import { formSubmitHandler } from './Helpers';
import './signup.css'

const Signup = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [loader, setLoader] = useContext(LoaderContext);

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
        setLoading(false)
        setLoader(false)
    }



    return (
        <div className={`signup-main-div ${loading ? 'disbleDiv' : ''}`}>
            {loader ? <Loader /> : null}
            <div className='signup-right-sec'>
                <p className='signup-heading'>Signup</p>
                <div className='authproviders-div'>

                    <button className='google-btn' onClick={() => authFbGoogleProvider(GoogleAuthProvider, setUserDataToFirestore, setError, setLoader)}>Sign With Google</button>

                    <button className='facebook-btn' onClick={() => authFbGoogleProvider(FacebookAuthProvider, setUserDataToFirestore, setError, setLoader )}>Sign With Facebook</button>

                </div>
                <p>or</p>
                <div className='signup-form-div'>

                    <SignupForm formSubmitHandler={formSubmitHandler} error={error} setError={setError} loading={loading} setUserDataToFirestore={setUserDataToFirestore} setLoader={setLoader} />

                </div>
                <div className='forgot-password-div'><Link className='forget-password-link' to='/forgotpassword'>Forgot Password ?</Link></div>
                <div className='signup-link-div'>Already have an account? <Link className='signup-link' to='/'>Sign in Now</Link> </div>
            </div>
        </div>
    )
}

export default Signup