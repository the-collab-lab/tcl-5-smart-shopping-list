import React, { useState } from 'react';
import './App.css';
import * as ls from 'local-storage';
import Home from './pages/Home';

function App() {
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
			<Home />
		</div>
	);
}

export default App;
