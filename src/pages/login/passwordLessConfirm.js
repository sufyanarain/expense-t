import React, { useEffect, useContext } from 'react'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useHistory } from "react-router-dom";
import LoaderContext from '../../components/context/LoaderContext';
import Loader from '../../components/loader/Loader';
import { fetchUser,addUserWithAutoGeneretedId,addNewUserDoc } from '../../Helpers/Firebase';


const PasswordLessConfirm = () => {
    const history = useHistory();
    const [loader, setLoader] = useContext(LoaderContext);
    const auth = getAuth();

    
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




    let email = window.localStorage.getItem('emailForSignIn');
    useEffect(() => {
        setLoader(true)
        if (isSignInWithEmailLink(auth, window.location.href)) { // check if user is signed in with email link
            if (!email) {
                setLoader(false)
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');   // remove email from local storage

                    setUserDataToFirestore(result.user); // set user data to firestore

                })
                .catch((error) => {
                    // setIsAuthenticated(true)
                    setLoader(false)
                    alert(error.message)
                });
        }else{
            history.push('/');
        }
        return () => {
            // cleanup
        }
    }, []);

    return (
        <>
            {loader ? <Loader /> : null}
            <div className='login-main-div'>
                {!email && <div className='login-right-sec'>
                    <p className='login-heading'>Wrong Email ! Please Input Correct Email !</p>
                    <button className='passwordless-error-btn' onClick={() => { window.location.reload(); }}>Input again</button>
                </div>}
            </div>
        </>
    )
}

export default PasswordLessConfirm