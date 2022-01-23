import { useState, useEffect } from 'react';
import Modal from '../Modal';
import moment from 'moment';
import styles from './styles.module.css';
import searchLogo from '../../Assets/images/magnifying-glass.png';
import AddOperationFormContainer from '../../Containers/AddOperationFormContainer';
import EditOperationFormContainer from '../../Containers/EditOperationFormContainer';
import '../../Assets/css/styles.css';

function Operations({ data = [], applyFilters, onDeleteOperation, errorMessage }) {
    const defaultFilters = {
        search: ""
    }

    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [allowRowClick, setAllowRowClick] = useState(true);
    const [shownRows, setShownRows] = useState([]);
    const [showAddOperationModal, setShowAddOperationModal] = useState(false);
    const [showEditOperationModal, setShowEditOperationModal] = useState(false);
    const [operationSelectedForUpdate, setOperationSelectedForUpdate] = useState(null);
    const [filters, setFilters] = useState({...defaultFilters});
    const CLICK_INTERVAL = 500;

    useEffect(() => {
        setIsComponentMounted(true);
        return () => { setIsComponentMounted(false) };
    }, []);
    
    function toggleHiddenRow(id) {
        
        /* Click debounce */
        setAllowRowClick(false);
        setTimeout(() => {
            if(isComponentMounted) setAllowRowClick(true);
        }, CLICK_INTERVAL);

        if(allowRowClick) {
            setShownRows(prev => {
                const index = prev.findIndex(rowId => rowId === id);
                const arrayCopy = [...prev];
                
                if(index >= 0)  {// Remove row from shownRows array
                    arrayCopy.splice(index, 1);
                } else {   // Add row id to array
                    arrayCopy.push(id);
                }
                
                return arrayCopy;
            });
        }
    }

    function onSearchFormSubmit(event) {
        event.preventDefault();
        applyFilters(filters);
    }

    function onSearchInputChange(event) {
        setFilters(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    }

    function handleEditButton(instance) {
        setOperationSelectedForUpdate(instance);
        setShowEditOperationModal(true);
    }

    function handleDeleteButton(instance) {
        onDeleteOperation(instance);
    }

    return(
        <div className={styles.wrapper}>
            
            {   // Add operation pop up form
                showAddOperationModal &&
                <Modal title="Add Operation" 
                    onHide={() => setShowAddOperationModal(false)} 
                    show={showAddOperationModal}
                >
                    <AddOperationFormContainer 
                        onSuccess={ () => setShowAddOperationModal(false) }
                    />
                </Modal>
            }

            {  // Edit operation pop up form
                showEditOperationModal &&
                <Modal title="Edit Operation" 
                    onHide={() => setShowEditOperationModal(false)} 
                    show={showEditOperationModal}
                >
                    <EditOperationFormContainer 
                        operation={operationSelectedForUpdate}
                        onSuccess={ () => setShowEditOperationModal(false) }
                    />
                </Modal>
            }

            <nav className={styles.nav}>
                <ul className={styles.filters}>
                    <li>
                        <form 
                            className={styles.search}
                            onSubmit={onSearchFormSubmit}
                        >
                            <input 
                                type="search"
                                name="search"
                                value={filters.search}
                                onChange={onSearchInputChange}
                            />
                            <button type="submit"><img src={searchLogo} alt="Search button icon" /></button>
                        </form>
                    </li>
                </ul>
                <ul className={styles.buttons}>
                    <li>
                        <button 
                            className="button greenBtn" 
                            onClick={() => setShowAddOperationModal(true)}
                        >
                            Add
                        </button>
                    </li>
                </ul>
			</nav>

            <h1>Last operations</h1>

            <table className={`${styles.table} ${styles.desktop}`}>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Concept</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((op, index) => (
                            <tr key={op.id} className={op.type === "IN" ? styles.green : styles.red}>
                                <td>{op.type === "IN" ? "+" : "-"} ${op.amount}</td>
                                <td>{op.concept}</td>
                                <td>{op.categoryName}</td>
                                <td>{moment(op.date, "YYYY-MM-DD").format("MMM DD, YYYY")}</td>
                                <td>{op.type === "IN" ? "Income" : "Expense"}</td>
                                <td className={styles.buttonsContainer}>
                                    <button 
                                        className="button blueBtn"
                                        onClick={() => handleEditButton(op)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="button redBtn"
                                        onClick={() => handleDeleteButton(op)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <table className={`${styles.table} ${styles.mobile}`}>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Concept</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((op, index) => [
                            <tr 
                                key={op.id} 
                                className={
                                    `${op.type === "IN" ? styles.green : styles.red} 
                                    ${styles.mobileRow}`
                                }
                                onClick={() => { toggleHiddenRow(op.id) }}
                            >
                                <td>{op.type === "IN" ? "+" : "-"} ${op.amount}</td>
                                <td>{op.concept}</td>
                                <td>{moment(op.date, "YYYY-MM-DD").format("MMM DD, YYYY")}</td>
                            </tr>,
                            <tr 
                                key={`extra_${op.id}`} 
                                className={
                                    `${styles.collapsibleRow} 
                                    ${shownRows.includes(op.id) ? "" : styles.collapsed}
                                    ${op.type === "IN" ? styles.green : styles.red}`
                                }
                            >
                                <td colSpan={3}>
                                    <div className={styles.content}>
                                        <span>
                                            <strong>Category</strong>: {op.categoryName}
                                        </span>

                                        <span>
                                            <strong>Type</strong>: {op.type === "IN" ? "Income" : "Expense"}
                                        </span>

                                        <div className={styles.buttonsContainer}>
                                            <button 
                                                className="button blueBtn"
                                                onClick={() => handleEditButton(op)}
                                            >
                                                Edit
                                            </button>

                                            <button 
                                                className="button redBtn"
                                                onClick={() => handleDeleteButton(op)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ])
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Operations;