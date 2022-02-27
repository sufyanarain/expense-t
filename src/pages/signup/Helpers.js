
import { signupWithEmailPassword } from "../../Helpers/Firebase"

export const validateSignupForm = (setError, name, email, password, Cpassword) => {
    if (name === '' || email === '' || password === '' || Cpassword === '') {
        setError('All fields are required')
        return false
    } else if (password !== Cpassword) {
        setError('Passwords do not match')
        return false
    } else if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
    }
    return true
}


export const formSubmitHandler = async (name, email, password, Cpassword, setError, setUserDataToFirestore, setLoader) => {
    console.log(name, email, password, Cpassword);
    const isFormValid = validateSignupForm(setError, name, email, password, Cpassword);
    if (isFormValid) {
        setLoader(true)
        try {
            const userCredential = await signupWithEmailPassword(email, password);
            const user = userCredential.user;
            user.displayName = name;
            setUserDataToFirestore(user)
            setLoader(false)
        } catch (err) {
            setError(err.code)
            setLoader(false)
        }

    }
}



