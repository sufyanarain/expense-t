import React, {  useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoaderContext from '../components/context/LoaderContext';

const Protected = ({ path, component }) => {
    const [getUser, setUser] = useState(false);
    const [protected1, setProtected] = useState('');
    const [pub, setPub] = useState('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
                setProtected(<Route path={path} component={component} />)
            } else {
                setUser(false);
                setPub(<Redirect to='/' />)
            }
        })
    }, [path]);

    
    return getUser ? protected1 : pub





}



export default Protected