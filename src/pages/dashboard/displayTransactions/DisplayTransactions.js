import React from 'react'
import moment from 'moment';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { AiFillFilter } from "react-icons/ai";


const DisplayTransactions = (props) => {
    let totalAmount = 0;
    props.filteredExpenses && props.filteredExpenses.map(({ amount }) => {
        totalAmount += parseFloat(amount)
    })


    return (
        <div className='display-transaction-div'>
            <table className='transaction-table'>
                <thead>
                    <tr>
                        <th onClick={() => props.setSort({ sortBy: 'id', sortSeq: !props.sort.sortSeq })} >ID <AiFillFilter className={`filter-icon ${props.sort.sortBy == 'id' ? 'filtered' : ''}`} /></th>
                        <th onClick={() => props.setSort({ sortBy: 'description', sortSeq: !props.sort.sortSeq })} >Description <AiFillFilter className={`filter-icon ${props.sort.sortBy == 'description' ? 'filtered' : ''}`} /></th>
                        <th onClick={() => props.setSort({ sortBy: 'category', sortSeq: !props.sort.sortSeq })} >Category <AiFillFilter className={`filter-icon ${props.sort.sortBy == 'category' ? 'filtered' : ''}`} /></th>
                        <th onClick={() => props.setSort({ sortBy: 'amount', sortSeq: !props.sort.sortSeq })} >Amount <AiFillFilter className={`filter-icon ${props.sort.sortBy == 'amount' ? 'filtered' : ''}`} /></th>
                        <th onClick={() => props.setSort({ sortBy: 'createdAt', sortSeq: !props.sort.sortSeq })} >Date <AiFillFilter className={`filter-icon ${props.sort.sortBy == 'createdAt' ? 'filtered' : ''}`} /></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tableLoading ? 'loading' :  
                        props.searchKeys ? props.filteredExpenses.map((expense, index) => {
                            return (
                                <tr className='transaction-tr' key={index}>
                                    <td className='td td-id'>{expense.id}</td>
                                    <td className='td td-description'>{expense.description}</td>
                                    <td className='td td-category'>{expense.category}</td>
                                    <td className='td td-amount'>{expense.amount} <span>Rs</span></td>
                                    <td className='td td-date'>{expense.createdAt && moment(expense.createdAt.toDate()).format('YYYY-MM-DD HH:mm')}</td>
                                    <td onClick={() => props.deleteExpense(props.userProfile, expense.docId)} className='expense-delete'><BsTrash /></td>
                                    <td onClick={() => (props.setShowEditModal(true), props.setCurrentExpense({ category: expense.category, description: expense.description, amount: expense.amount, docId: expense.docId }))} className='expense-Edit'><BiEdit /></td>

                                </tr>
                            )
                        }) :
                            props.expenses.map((expense, index) => {
                                return (
                                    <tr className='transaction-tr' key={index}>
                                        <td className='td td-id'>{expense.id}</td>
                                        <td className='td td-description'>{expense.description}</td>
                                        <td className='td td-category'>{expense.category}</td>
                                        <td className='td td-amount'>{expense.amount} <span>Rs</span></td>
                                        <td className='td td-date'>{expense.createdAt && moment(expense.createdAt.toDate()).format('YYYY-MM-DD HH:mm')}</td>
                                        <td onClick={() => props.deleteExpense(props.userProfile, expense.docId)} className='expense-delete'><BsTrash /></td>
                                        <td onClick={() => (props.setShowEditModal(true), props.setCurrentExpense({ category: expense.category, description: expense.description, amount: expense.amount, docId: expense.docId }))} className='expense-Edit'><BiEdit /></td>

                                    </tr>
                                )
                            })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className='total-td td'>Total</td>
                        <td className='total-amount td'>{totalAmount}</td>
                        <td></td>
                    </tr>
                </tfoot>



            </table>
            <div>
                <button onClick={() => props.previousBtnHandler(props.userProfile, props.setExpenses, props.sort, props.lastDoc, props.setLastDoc, props.startAfter, props.endBefore)} className='pagination-btn'>&#x3c;</button>

                <button onClick={() => props.nextBtnHandler(props.userProfile, props.setExpenses, props.sort, props.lastDoc, props.setLastDoc, props.startAfter,props.setTableLoading)} className='pagination-btn'>&#x3e;</button>
            </div>
        </div>
    )
}

export default DisplayTransactions