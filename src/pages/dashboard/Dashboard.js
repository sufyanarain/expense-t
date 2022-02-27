import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import './dashboard.css'
import DisplayTransactions from './displayTransactions/DisplayTransactions'
import Modal from './displayTransactions/modal/Modal'
import AuthContext from '../../components/context/AuthContext'
import userProfileContext from '../../components/context/userProfileContext'
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { BiLogOutCircle } from "react-icons/bi";
import EditModal from './displayTransactions/editModal/EditModal'
import LoaderContext from '../../components/context/LoaderContext'
import Loader from '../../components/loader/Loader'
import { deleteExpenseFromFirestore } from '../../Helpers/Firebase'
import { startAfter, endAt } from 'firebase/firestore'
import { addExpenseFormHandler, fetchExpenses, editExpenseFormHandler, logoutBtnHandler, addCategoryBtnHandler, nameInputHandler, filteredExpensesFunc, nextBtnHandler,previousBtnHandler } from './Helpers'

const Dashboard = () => {
    const userObj = useContext(AuthContext);
    const userProfile = useContext(userProfileContext);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [sort, setSort] = useState({sortBy:'category',sortSeq:true});
    const [expenses, setExpenses] = useState([]);
    const [userObjFromFirestore, setUserObjFromFirestore] = useState({});
    const [loading, setLoading] = useState(false);
    const [categoryError, setCategoryError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [filteredBy, setFilteredBy] = useState('category');
    const [loader, setLoader] = useContext(LoaderContext);
    const [error, setError] = useState('');
    const [currentExpense, setCurrentExpense] = useState({});
    const [searchKeys, setSearchKeys] = useState('');
    const [category, setCategory] = useState('');
    const [userName, setUserName] = useState('');
    const [lastDoc, setLastDoc] = useState('');
    const [tableLoading, setTableLoading] = useState(false);
    console.log(tableLoading);
    const db = getFirestore();


    useEffect(() => {
        setLoader(true)
        userProfile && onSnapshot(doc(db, "users_profile", `${userProfile}`), (doc) => { //get user data from firestore
            setUserObjFromFirestore(doc.data())
            setLoader(false)
        });
    }, [userProfile]);



    useEffect(() => {

        fetchExpenses(userProfile, setFilteredExpenses, searchKeys, filteredBy,setTableLoading)
    }, [userProfile, searchKeys, filteredBy, sort])

    useEffect(() => {
        filteredExpensesFunc(userProfile, setExpenses, sort, setLastDoc,setTableLoading)
    }, [userProfile, sort])



    return (
        <div >
            {loader ? <Loader /> : null}
            <Nav />
            {userObjFromFirestore.name ? <div className='dashboard-main-div'>
                <EditModal error={error} setError={setError} editExpenseFormHandler={editExpenseFormHandler} setTableLoading={setTableLoading} userProfile={userProfile} currentExpense={currentExpense} showEditModal={showEditModal} setShowEditModal={setShowEditModal} userObj={userObjFromFirestore} />
                <div className='user-name-logout-btn-div'> {/*user name and logout button */}
                    <h3>Welcome {userObjFromFirestore.name}</h3>
                    <BiLogOutCircle onClick={logoutBtnHandler} className='logout-btn' />
                </div>
                <div className='heading-buttons-top-div'>
                    <div className='seartch-div'>
                        <input className='search-input' onChange={(e) => setSearchKeys(e.target.value)} type="text" placeholder={`Search by ${filteredBy}`} />
                        <select className='filter-select' defaultValue='category' onChange={(e) => setFilteredBy(e.target.value)} name="filterCategory" id="filterCategory">
                            <option value="category">category</option>
                            <option value="description">Description</option>

                        </select>
                    </div>
                    <div className='modal-btns'>
                        <div>
                            <input type='text' value={category} className={`add-category-input ${categoryError ? 'category-error' : ''}`} placeholder='Input Category' onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <button onClick={() => addCategoryBtnHandler(userProfile, category, setLoading, setCategoryError, setCategory)} className='btn primary category-btn'>{loading ? 'Loading' : '+ category'}</button>
                        <Modal error={error} setError={setError} userProfile={userProfile} userObj={userObjFromFirestore} addExpenseFormHandler={addExpenseFormHandler} />
                    </div>
                </div>
                <DisplayTransactions setShowEditModal={setShowEditModal} setCurrentExpense={setCurrentExpense} userProfile={userProfile} deleteExpense={deleteExpenseFromFirestore} filteredExpenses={filteredExpenses} expenses={expenses} searchKeys={searchKeys} setSort={setSort} sort={sort} setTableLoading={setTableLoading} nextBtnHandler={nextBtnHandler} previousBtnHandler={previousBtnHandler} setExpenses={setExpenses} lastDoc={lastDoc} setLastDoc={setLastDoc} startAfter={startAfter} endBefore={endAt} tableLoading={tableLoading} />
            </div> : // if user signed in with passwordless sign in
                <div className='dashboard-main-div'>
                    <div className='update-name-div'>
                        <h3>Please input your name to continue !</h3><br /><br />
                        <div>
                            <input onChange={(e) => setUserName(e.target.value)} type='text' className='add-name-input' placeholder='Input Your Name' />
                            <button className='btn primary add-input-btn' onClick={() => nameInputHandler(userObj.uid, userProfile, userName)}>Submit</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard