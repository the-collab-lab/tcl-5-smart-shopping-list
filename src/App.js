import React from 'react';
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
