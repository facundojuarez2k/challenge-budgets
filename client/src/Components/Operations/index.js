import { useState, useEffect } from 'react';
import Modal from '../Modal';
import moment from 'moment';
import styles from './styles.module.css';
import searchLogo from '../../Assets/images/magnifying-glass.png';
import '../../Assets/css/styles.css';

function Operations({data = []}) {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [allowRowClick, setAllowRowClick] = useState(true);
    const [shownRows, setShownRows] = useState([]);
    const [showAddOperationModal, setShowAddOperationModal] = useState(false);
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

    return(
        <div className={styles.wrapper}>
            <Modal title="Add Operation" onHide={() => setShowAddOperationModal(false)} show={showAddOperationModal}>
                
            </Modal>

            <nav className={styles.nav}>
                <div className={styles.search}>
					<input type="search" />
					<button><img src={searchLogo} alt="Search button icon" /></button>
				</div>
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
                                <td>{moment(op.date).format("MMM DD, YYYY")}</td>
                                <td>{op.type === "IN" ? "Income" : "Expense"}</td>
                                <td><button className="button blueBtn">Edit</button></td>
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
                                <td>{moment(op.date).format("MMM DD, YYYY")}</td>
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
                                        <button className="button blueBtn">Edit</button>
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