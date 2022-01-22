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
			{
				(isLoading === true)
				?
					<div>Loading...</div>
				: null
			}
			{
				(isAuthenticated === false)
				?
					<div className={styles.formContainer}>
						<h1 className="brand lg">QuickBudget</h1>
						<LoginFormContainer 
							onAuthenticated={() => { setIsAuthenticated(true) }}
						/>
					</div>
				:
				<main className="container">
					<OperationsContainer />
				</main>
			}
		</div>
	);
}

export default App;
