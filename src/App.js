import React, { useEffect, useState } from "react";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import { Switch } from 'react-router-dom';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import PasswordLessConfirm from "./pages/login/passwordLessConfirm";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthContext from "./components/context/AuthContext";
import userProfileContext from "./components/context/userProfileContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import LoaderContext from "./components/context/LoaderContext";
import { getDataOnce } from "./Helpers/Firebase";

function App() {
  const [userAuthObj, setUserAuthObj] = useState({});
  const [userProfileObj, setUserProfileObj] = useState('');
  const loader = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuthObj(user);

      } else {
        setUserAuthObj({});
      }
    })
  }, []);

  useEffect(() => {
    userAuthObj.uid &&
      onSnapshot(doc(db, "users", userAuthObj.uid), (doc) => {
        console.log(doc.data());
        doc.data() && setUserProfileObj(doc.data().userRef.id)


      });
  }, [userAuthObj])


  return (
    <Switch>
      <LoaderContext.Provider value={loader}>

        <Public path="/signup" component={Signup} />
        <Public path="/confirm" component={PasswordLessConfirm} />
        <Public path="/forgotpassword" component={ForgotPassword} />
        <Public exact path="/" component={Login} />

        <AuthContext.Provider value={userAuthObj}>
          <userProfileContext.Provider value={userProfileObj}>
            <Protected path="/dashboard" component={Dashboard} />
          </userProfileContext.Provider>
        </AuthContext.Provider>

      </LoaderContext.Provider>
    </Switch>
  );
}

export default App;
