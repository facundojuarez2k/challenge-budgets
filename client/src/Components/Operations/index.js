import { useState, useEffect, useMemo } from 'react';
import Modal from '../Modal';
import moment from 'moment';
import styles from './styles.module.css';
import searchLogo from '../../Assets/images/magnifying-glass.png';
import AddOperationFormContainer from '../../Containers/AddOperationFormContainer';
import EditOperationFormContainer from '../../Containers/EditOperationFormContainer';
import '../../Assets/css/styles.css';

function Operations({ data = [], balance, applyFilters, onDeleteOperation, errorMessage }) {
    const defaultFilters = {
        search: ""
    }
    const [showAddOperationModal, setShowAddOperationModal] = useState(false);
    const [showEditOperationModal, setShowEditOperationModal] = useState(false);
    const [operationSelectedForUpdate, setOperationSelectedForUpdate] = useState(null);
    const [filters, setFilters] = useState({...defaultFilters});

    const operationsList = useMemo(() => data, [data]);

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

    function handleEditOperation(instance) {
        setOperationSelectedForUpdate(instance);
        setShowEditOperationModal(true);
    }

    function handleDeleteOperation(instance) {
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

            {   // Balance section
                (balance && balance !== null) &&
                <div className={styles.balance}>
                    <span className={styles.primary}>
                        Balance: {`${balance.total < 0 ? "-" : ""}$${Math.abs(balance.total)?.toFixed(2)}`}
                    </span>
                    <span className={styles.secondary}>Income: ${balance.in?.toFixed(2)}</span> 
                    <span className={styles.secondary}>Expenses: ${balance.out?.toFixed(2)}</span>
                </div>
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

            <OperationsTable 
                operationsList={operationsList}
                handleDeleteButton={handleDeleteOperation}
                handleEditButton={handleEditOperation}
            />
            
        </div>
    );
}

function OperationsTable({operationsList, handleDeleteButton, handleEditButton}) {
    const [shownRows, setShownRows] = useState([]);
    const [allowRowClick, setAllowRowClick] = useState(true);
    const [isComponentMounted, setIsComponentMounted] = useState(false);
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

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Concept</th>
                        <th className={styles.showOnDesktop}>Category</th>
                        <th>Date</th>
                        <th className={styles.showOnDesktop}>Type</th>
                        <th className={`${styles.showOnDesktop} text-center`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        operationsList.map(op => {

                            const buttons = (
                                <>
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
                                </>
                            );

                            const amountCell = <td>{op.type === "IN" ? "+" : "-"} ${parseFloat(op.amount)?.toFixed(2)}</td>;
                            const conceptCell = <td>{op.concept}</td>;
                            const categoryCell = <td>{op.categoryName}</td>;
                            const dateCell = <td>{moment(op.date, "YYYY-MM-DD").format("MMM DD, YYYY")}</td>;
                            const typeCell = <td>{op.type === "IN" ? "Income" : "Expense"}</td>;
                            const buttonsCell = <td><div className={styles.buttonsContainer}>{buttons}</div></td>;

                            return (
                                [
                                    <tr 
                                        key={`tr_dsk_${op.id}`} 
                                        className={`${styles.showOnDesktop} ${op.type === "IN" ? styles.green : styles.red}`}
                                    >
                                        {amountCell}
                                        {conceptCell}
                                        {categoryCell}
                                        {dateCell}
                                        {typeCell}
                                        {buttonsCell}
                                    </tr>,
                                    <tr 
                                        key={`tr_mob_${op.id}`} 
                                        className={`${styles.showOnMobile} ${op.type === "IN" ? styles.green : styles.red} ${styles.mobileRow}`}
                                        onClick={() => { toggleHiddenRow(op.id) }}
                                    >
                                        {amountCell}
                                        {conceptCell}
                                        {dateCell}
                                    </tr>,
                                    <tr 
                                        key={`tr_mob_2_${op.id}`} 
                                        className={
                                            `${styles.showOnMobile}
                                            ${styles.collapsibleRow} 
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
        
                                                <div className={styles.buttonsContainer}>{buttons}</div>
                                            </div>
                                        </td>
                                    </tr>
                                ]
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Operations;