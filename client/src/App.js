import { useEffect, useState } from 'react';
import { isUserAuthenticated, logout } from './Services/auth';
import LoginFormContainer from './Containers/LoginFormContainer';
import RegisterFormContainer from './Containers/RegisterFormContainer';
import OperationsContainer from './Containers/OperationsContainer';
import LoadingSpinner from './Components/LoadingSpinner';
import { OperationsProvider } from './Context/Operations';
import { AuthProvider, useAuthContext } from './Context/Auth';
import styles from './App.module.css';
import './Assets/css/styles.css';
 
function App() {
	const { isLoggedIn, setIsLoggedIn } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);
	const [showLoginForm, setShowLoginForm] = useState(true);

	useEffect(() => {
		init();
	}, []);

	async function init() {
		try {
			setIsLoading(true);

			const result = await isUserAuthenticated();
			setIsLoggedIn(result);

		} finally {
			setIsLoading(false);
		}
	}

	function toggleLoginForm() {
		setShowLoginForm(prev => !prev);
	}

	function handleLogoutButton() {
		setIsLoggedIn(false);
		logout();
	}

	return (
		<div className={styles.App}>
			<LoadingSpinner show={isLoading} fullScreen={true} />
			<nav className="container">
				{isLoggedIn && 
					<button className="button" onClick={handleLogoutButton}>Log out</button>
				}
			</nav>
			{
				(isLoggedIn === false)
				?
					<div className={`${styles.formContainer}`}>
						<h1 className="brand lg">QuickBudget</h1>
							{
								showLoginForm 
								? 
								<>
									<LoginFormContainer />
									<button 
										className="button orangeBtn"
										onClick={toggleLoginForm}
										disabled={isLoading}
									>
										Sign Up
									</button>
								</>
								:
								<>
									<RegisterFormContainer 
										// Callback to execute after successfully registering 
										onSuccess={ 
											function(loggedIn = false) {
												setShowLoginForm(!loggedIn);
											} 
										}
									/>
									<button 
										className="button orangeBtn"
										onClick={toggleLoginForm}
										disabled={isLoading}
									>
										Sign In
									</button>
								</>
							}
					</div>
				:
				<main className="container">
					<OperationsContainer />
				</main>
			}
		</div>
	);
}

const AppWrapper = () => (
	<AuthProvider>
		<OperationsProvider>
			<App />
		</OperationsProvider>
	</AuthProvider>
);

export default AppWrapper;