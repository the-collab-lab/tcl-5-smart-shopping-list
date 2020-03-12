import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';

function App() {
	return (
		<div className='App'>
			<div>
				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<Switch>
					<Route path='/ShoppingList'>
						<ShoppingList />
					</Route>
					<Route path='/AddItem'>
						<AddItem />
					</Route>
				</Switch>
			</div>

			<footer>
				<FooterTabs />
			</footer>
		</div>
	);
}

export default App;

{
	/* <header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header> */
}
