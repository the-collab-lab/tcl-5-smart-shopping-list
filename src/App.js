import React, { useState } from 'react';
import './App.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';
import NewListButton from './components/NewListButton';
import * as ls from 'local-storage';
import Home from './pages/Home';

function App() {
	const [token, setToken] = useState(ls.get('shoppingListToken'));
	console.log({ token });

	return (
		<div className='App'>
			{/*Link </div>'/FirebaseTesting'>FirebaseTesting</Link>
			{token ? (
				<Redirect to='/ShoppingList' />
			) : (
				<NewListButton setToken={setToken} token={token} />
			)}
			{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. 
            <Home/>
			<Switch>
				<Route path='/ShoppingList'>
					<ShoppingList token={token} />
				</Route>
				<Route path='/AddItem'>
					<AddItem token={token} />
				</Route>
			</Switch>

			<footer>
				<FooterTabs />
			</footer>*/}
			   <Home/>
		</div>
	);
}

export default App;