import React, { useState, useRef } from 'react'
import './modal.css'


const Modal = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [category, setCategory] = useState('')
    // const [error, setError] = useState('')

    const description = useRef(null)
    const amount = useRef(null)

    const modalHandler = () => { // toggles the modal
        setShowModal(!showModal)
    }
    const expenseForm = document.getElementById('expense-form')

    const handleChange = (e) => { // handles the change category
        setCategory(e.target.value)
    }


    return (
        <div> <button className='btn primary modal-add-btn   ' onClick={modalHandler}>+ Add</button>
            <div className={`modal ${showModal ? 'display-block' : 'display-none'}`} >
                <section className="modal-main">
                    <div>
                        <form className='add-transaction-form' onSubmit={(e) => (e.preventDefault(), props.addExpenseFormHandler(category, description.current.value, +amount.current.value, props.userProfile, props.setError, expenseForm, modalHandler))} id='expense-form'>
                            <label htmlFor="description">Description </label>
                            <input ref={description} type="text" id='description' placeholder='Enter Description' />

                            <label htmlFor="category">Category </label>
                            <select name="category" id="category" onChange={handleChange}>
                                <option value='' >Please Select Category</option>
                                {props.userObj.categories && props.userObj.categories.map((category, index) => {

                                    return <option key={`g${index}`} value={category}>{category}</option>

                                })}
                            </select>
                            <label htmlFor="amount">Amount </label>
                            <input ref={amount} type="number" id='amount' placeholder='Enter Amount' />
                            <p className='show-error'>{props.error}</p>
                            <button className='transaction-submit-btn btn primary'>Add</button>
                        </form>
                    </div>
                    <button onClick={modalHandler} className='close-btn' >
                        X
                    </button>
                </section>
            </div>

        </div>
    )
}

export default Modal;