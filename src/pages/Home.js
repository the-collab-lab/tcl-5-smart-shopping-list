import React, { useState } from 'react';
/*import '../App.css';*/
import NewListButton from '../components/NewListButton';
import * as ls from 'local-storage';
import fb from '../lib/firebase';
import { Link, Redirect } from 'react-router-dom';
import FooterTabs from '../components/FooterTabs';

function Home({ token, setToken }) {
	const [inputToken, setInputToken] = useState('');
	// Adds Value of token entered into inputToken
	const handleChange = e => {
		setInputToken(e.target.value);
	};
	// Checks the firestore db to see if inputToken exists
	const checkToken = e => {
		e.preventDefault();
		let db = fb.firestore();
		if (inputToken.length === 0) {
			alert('You must enter a token value.  Try again! ');
		} else {
			db.collection(`${inputToken}`)
				.get()
				.then(data => {
					if (data.empty === true) {
						alert('Bad token, Try again or Create a New List');
					} else {
						ls.set('ShoppingListToken', inputToken);
						setToken(inputToken);
					}
				});
		}
	};
	console.log('inputToken from Home: ', inputToken);
	return (
		<div className='App'>
			<Link to='/FirebaseTesting'>FirebaseTesting</Link>
			{token ? (
				<Redirect to='/ShoppingList' />
			) : (
				<div>
				<div className='Home-token'>
					<input
						type='text'
						name='inputToken'
						placeholder='enter token'
						onChange={handleChange}
						required
					/>
					<br />
					<button onClick={checkToken}>Join List</button>
					<br />
					<NewListButton
						className='button'
						setToken={setToken}
						token={token}
					/>
				</div>
				<input
					type="checkbox"
					className="button-link"
					id="WelcomeClick"
				/>
				<label htmlFor="WelcomeClick" id="Welcome">
				Welcome, find out how it works?
				</label>
				<div id="hideWelcome">
					<ul>
						<li>
			               You can start a new list, or join a friend's list with the shopping list code.
						</li>
						<li>
							Add items to your shopping list.
						</li>
						<li>
							Your list will be sorted with most needed items first.
						</li>
					</ul>
				</div>	
			</div>
					
			)}
		


			<footer>
				<FooterTabs />
			</footer>
		</div>
	)
			}
export default Home;
