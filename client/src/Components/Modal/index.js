import { useEffect, useState } from 'react';
import styles from './styles.module.css';

function Modal({show, onHide, title, ...rest}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={`${styles.wrapper} ${!show ? styles.hidden : ""}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span>{title}</span>
                    <button className={styles.closeButton} onClick={() => onHide()}>X</button>
                </div>
                <div className={styles.body}>
                    {rest.children}
                </div>
            </div>
        </div>
    );
}

export default Modal;