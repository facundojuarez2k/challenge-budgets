import { useEffect, useState } from 'react';
import { isUserAuthenticated } from './Services/auth';
import styles from './App.module.css';
import './Assets/css/styles.css';
import LoginFormContainer from './Containers/LoginFormContainer';
import OperationsContainer from './Containers/OperationsContainer';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		init();
	}, []);

	async function init() {
		try {
			setIsLoading(true);

			if(await isUserAuthenticated()) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}

		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={styles.App}>
			<main className="container">
				{
					(isLoading === true)
					?
						<span>Loading...</span>
					:  
					(isAuthenticated === false)
					? 
						<LoginFormContainer 
							onAuthenticated={() => { setIsAuthenticated(true) }}
						/>
					: 
						<OperationsContainer />
				}
			</main>
		</div>
	);
}

export default App;
