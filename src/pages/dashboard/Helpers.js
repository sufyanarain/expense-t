
import { addExpensesToFirestore, getExpensesFromFirestore, editExpensesFromFirestore, logout, addCategoryToFirestore, setUserNameToFirestore, filteredExpensesFromFIrestore, nextDocsFromFIrestore,PreviousDocsFromFIrestore } from "../../Helpers/Firebase"
import Swal from "sweetalert2";

export const validate = (description, amount, category, setError) => {
    console.log(description === '');
    if (description === '' || amount === '') {
        setError('All fields are required')
        return false
    } else if (category === '') {
        setError('Please select a category')
        return false
    }
    setError('')
    return true
}

export const addExpenseFormHandler = (category, description, amount, userProfile, setError, expenseForm, modalHandler) => {
    const isvalidate = validate(description, amount, category, setError)
    if (isvalidate) {
        addExpensesToFirestore(category, description, amount, userProfile)
        expenseForm.reset()
        modalHandler()
    }
}



export const fetchExpenses = async (userProfile, setFilteredExpenses, searchKeys, filteredBy,setTableLoading) => {
    await getExpensesFromFirestore(userProfile, setFilteredExpenses, searchKeys, filteredBy,setTableLoading)

}


export const filteredExpensesFunc = async (userProfile, setExpenses, sort, setLastDoc,setTableLoading) => {
    setTableLoading(true)
    await filteredExpensesFromFIrestore(userProfile, setExpenses, sort, setLastDoc,setTableLoading)
    setTableLoading(false)
}

export const editExpenseFormHandler = (category, description, amount, docId, userProfile, setError, modalHandler,setTableLoading) => {
    const isvalidate = validate(description, amount, category, setError)
    if (isvalidate) {
        editExpensesFromFirestore(category, description, amount, userProfile, docId,setTableLoading)
        modalHandler()

    }
}


export const logoutBtnHandler = () => {
    Swal.fire({
        title: 'Do you want to logout?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: ` Yes `,
    }).then((result) => {

        if (result.isDenied) {
            logout()
            window.location.reload(true)
        }
    })
}


export const addCategoryBtnHandler = (userProfile, category, setLoading, setCategoryError, setCategory) => {
    if (category !== '') {
        addCategoryToFirestore(userProfile, category, setLoading, setCategory)
        setCategoryError(false)
    } else {
        setCategoryError(true)
    }

}

export const nameInputHandler = (userDocId, userrofileDocId, name) => {
    setUserNameToFirestore('users', userDocId, name)
    setUserNameToFirestore('users_profile', userrofileDocId, name)
}

export const nextBtnHandler = (userProfile, setExpenses, sort, lastDoc, setLastDoc, action,setTableLoading) => {
    nextDocsFromFIrestore(userProfile, setExpenses, sort, lastDoc, setLastDoc, action,setTableLoading)
}

export const previousBtnHandler = (userProfile, setExpenses, sort, lastDoc, setLastDoc, action) => {
    PreviousDocsFromFIrestore(userProfile, setExpenses, sort, lastDoc, setLastDoc, action,)
}