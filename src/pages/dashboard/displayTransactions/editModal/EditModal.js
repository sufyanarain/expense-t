import React, { useState, useRef, } from 'react'

const EditModal = (props) => {
    const expenseForm = document.getElementById('expense-form')
    const [category, setCategory] = useState('')
    const description = useRef(null)
    const amount = useRef(null)

    const modalHandler = () => { // toggles the modal
        props.setShowEditModal(!props.showEditModal)
        expenseForm && expenseForm.reset()
        setCategory('')
    }

    const handleChange = (e) => { // handles the change category
        setCategory(e.target.value)
    }


    return (
        <div>
            <div className={`modal ${props.showEditModal ? 'display-block' : 'display-none'}`} >
                <section className="modal-main">
                    <div>
                        <form id='expenseForm' className='add-transaction-form' onSubmit={(e) => (e.preventDefault(), props.editExpenseFormHandler(category, description.current.value, +amount.current.value, props.currentExpense.docId, props.userProfile, props.setError,modalHandler,props.setTableLoading) )} id='expense-form'>
                            <label htmlFor="description">Description </label>
                            <input ref={description} type="text" id='description' defaultValue={props.currentExpense.description} placeholder='Enter Description' />

                            <label htmlFor="category">Category </label>
                            <select name="category" id="category" onChange={handleChange}>
                                <option value='' >Select Category</option>
                                {props.userObj.categories && props.userObj.categories.map((category, index) => {

                                    return <option key={`g${index}`} value={category}>{category}</option>

                                })}
                            </select>
                            <label htmlFor="amount">Amount </label>
                            <input ref={amount} defaultValue={props.currentExpense.amount} type="number" id='amount' placeholder='Enter Amount' />
                            <p className='show-error'>{props.error}</p>
                            <button className='transaction-submit-btn btn primary'>Update</button>
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

export default EditModal;