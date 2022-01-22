import { useEffect, useState } from 'react';
import styles from './styles.module.css';

function LoadingSpinner({show = false, fullScreen = false, hideDelay = 300}) {
    const [isComponentMounted, setIsComponentMounted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(show);

    useEffect(() => {
        setIsComponentMounted(true);

        return () => { setIsComponentMounted(false); };
    }, []);

    useEffect(() => {
        if(showSpinner === true && show === false) {
            // Add hiding delay to avoid flickering
            setTimeout(function() {
                if(isComponentMounted) {
                    setShowSpinner(false);
                }
            }, hideDelay);
        } else {
            setShowSpinner(show);
        }
    }, [show]);

    return (
        showSpinner &&
        <div className={fullScreen && styles.fullScreen}>
            <div className={styles.spin}></div>
        </div>
    );
}

export default LoadingSpinner;