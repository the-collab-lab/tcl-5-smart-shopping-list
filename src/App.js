import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';
import * as ls from 'local-storage';
import Home from './pages/Home';

function App() {
	const [token, setToken] = useState(ls.get('shoppingListToken'));
	console.log({ token });

	return (
		<div className='App'>
			<Switch>
				<Route path='/ShoppingList'>
					<ShoppingList token={token} />
				</Route>
				<Route path='/AddItem'>
					<AddItem token={token} />
				</Route>
				<Route path='/FirebaseTesting'>
					<FirebaseTesting />
				</Route>
			</Switch>
			<Home token={token} setToken={setToken} />
			<footer>
				<FooterTabs />
			</footer>
		</div>
	);
}

export default App;
