import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword, sendSignInLinkToEmail, sendPasswordResetEmail } from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc, getFirestore, addDoc, collection, getDoc, arrayUnion, where, query, updateDoc, orderBy, limit, getDocs,startAfter,endBefore,limitToLast, endAt, startAt } from "firebase/firestore";
import Swal from "sweetalert2";

const auth = getAuth();
const db = getFirestore();


// Firebase Auth


export const signupWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}


export const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)

}

export const authFbGoogleProvider = async (authProvider, setUserDataToFirestore, setError, setLoader) => {
    const provider = new authProvider();
    setLoader(true)
    try {
        const credential = await signInWithPopup(auth, provider);
        setUserDataToFirestore(credential.user);
    } catch (err) {
        setError(err.code)
        setLoader(false)
    }
}




//passwordless login
export const passwordLessLoginFunc = async (email) => {
    const actionCodeSettings = {
        url: 'http://localhost:3000/confirm', // The URL to redirect to after email submission.
        handleCodeInApp: true,
    };

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings) //send email link to user
        alert('Email sent ! please Confirm Email')
        window.localStorage.setItem('emailForSignIn', email);

    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
    }

}


export const forgotPawwsordFunc = (email, setError) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!")
        })
        .catch((error) => {
            const errorCode = error.code;
            setError(errorCode)
        });
}





export const logout = () => {
    signOut(auth).then(() => {
        return true;
    }).catch((error) => {
        return error;
    });
}



//set new user to firestore
export const addNewUserDoc = async (collectionName, uid, name, email, userRefId) => {
    await setDoc(doc(db, collectionName, uid),
        {
            name,
            email,
            uid,
            userRef: doc(db, "users_profile", userRefId),
            createdAt: serverTimestamp()
        });
}

export const addUserWithAutoGeneretedId = async (collectionName, name, email) => {
    const userRef = await addDoc(collection(db, collectionName), {
        name,
        email,
        categories: [],
        expenses: [],
        createdAt: serverTimestamp(),
    });
    return userRef.id;
}




//get data from firestore once
export const fetchUser = async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

//get data from firestore realtime
export const getRealTimeDataFirestore = (collectionName, docId) => {
    return onSnapshot(doc(db, collectionName, docId), (doc) => {
        return doc.data();

    });
}



//Expenses

export const addExpensesToFirestore = async (category, description, amount, userProfile) => {

    const docRef = await addDoc(collection(db, "users_profile", userProfile, 'expenses'), {
        id: (new Date().getTime()).toString().slice(6),
        description,
        amount,
        category,
        createdAt: serverTimestamp(),
        isActive: true
    });
    const updateDocRef = doc(db, "users_profile", userProfile, 'expenses', docRef.id)
    await updateDoc(updateDocRef, {
        docId: docRef.id
    });
}

export const getExpensesFromFirestore = async (userProfile, setFilteredExpenses, searchKeys, filteredBy,setTableLoading) => {
    setTableLoading(true)
    const q = query(collection(db, "users_profile", userProfile, 'expenses'), where(filteredBy, '>=', searchKeys), where(filteredBy, '<=', `${searchKeys}\uf8ff`), where("isActive", "==", true));

    return onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            arr.push(doc.data());
        });
        setFilteredExpenses(arr);
        setTableLoading(false)
    });

}


export const filteredExpensesFromFIrestore = async (userProfile, setExpenses, sort, setLastDoc,setTableLoading) => {
    // setTableLoading(true)
    let seqq = 'asc';
    if(sort.sortSeq){
        seqq = 'asc'
    }else{
        seqq = 'desc'
    }
    console.log(seqq,sort.sortSeq);

    const q = query(collection(db, "users_profile", userProfile, 'expenses'), where("isActive", "==", true), orderBy(sort.sortBy,seqq), limit(5));
    const lastDoc = await getDocs(q);
    const lastVisible = lastDoc.docs[lastDoc.docs.length-1];
    setLastDoc(lastVisible)
    return onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
        setExpenses(arr);
        // setTableLoading(false)
    });
}

export const nextDocsFromFIrestore = async (userProfile, setExpenses, sort, lastDoc, setLastDoc,action,setTableLoading) => {
    setTableLoading(true)
    let seqq = 'asc';
    if(sort.sortSeq){
        seqq = 'asc'
    }else{
        seqq = 'desc'
    }

    const q = query(collection(db, "users_profile", userProfile, 'expenses'), where("isActive", "==", true), orderBy(sort.sortBy,seqq), limit(5), startAt(lastDoc));
    const lastDocs = await getDocs(q);
    const lastVisible = lastDocs.docs[lastDocs.docs.length-1];
    setLastDoc(lastVisible)
    return onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
            console.log(doc.data());
        });
        setExpenses(arr);
        setTableLoading(false)
    });
}

export const PreviousDocsFromFIrestore = async (userProfile, setExpenses, sort, lastDoc, setLastDoc,action) => {
    console.log(sort);

    const q = query(collection(db, "users_profile", userProfile, 'expenses'), where("isActive", "==", true), orderBy(sort.sortBy), limit(5), endAt(lastDoc));
    const lastDocs = await getDocs(q);
    const lastVisible = lastDocs.docs[lastDocs.docs.length-1];
    setLastDoc(lastVisible)
    return onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
            console.log(doc.data());
        });
        setExpenses(arr);
    });
}




export const editExpensesFromFirestore = async (category, description, amount, userProfile, docId,setTableLoading) => {
    setTableLoading(true)
    const docRef = doc(db, "users_profile", userProfile, 'expenses', docId)
    await updateDoc(docRef, {
        category,
        description,
        amount
    });
    setTableLoading(false)
}


export const deleteExpenseFromFirestore = async (userProfile, docId) => {

    Swal.fire({
        title: 'Do you want to delete?',
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Delete`,
    }).then((result) => {

        if (result.isDenied) {
            Swal.fire('Deleted', '', 'success')
            const docRef = doc(db, "users_profile", userProfile, 'expenses', docId)
            updateDoc(docRef, {
                isActive: false
            });

        }
    })

}

export const addCategoryToFirestore = async (userProfile, category, setLoading, setCategory) => {
    console.log(setCategory);
    setLoading(true)
    const userRef = doc(db, "users_profile", userProfile);
    await updateDoc(userRef, {
        categories: arrayUnion(category)
    });
    setLoading(false)
    setCategory('')
}

export const setUserNameToFirestore = async (collectionId, docId, name) => {
    const users_ref = doc(db, collectionId, docId);

    await updateDoc(users_ref, {
        name,
    });
}