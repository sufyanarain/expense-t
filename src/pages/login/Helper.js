import { loginWithEmailPassword } from "../../Helpers/Firebase"


export const validate = (email, password, setError) => {
    if (email.trim() === '' || password.trim() === '') {
        setError('All fields are required')
        return false
    } else if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
    }
    return true
}

export const formSubmitHandler = async (email, password, setError, setLoader, signedUp) => {
    const isValid = validate(email, password, setError)
    if (isValid) {
        setLoader(true)
        try {
            await loginWithEmailPassword(email, password)
            signedUp()
        } catch (err) {
            setError(err.code)
            setLoader(false)
        }
    }
}
