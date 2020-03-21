import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';

function App() {
	return (
		<div className='App'>
			<div>
      <a href="/FirebaseTesting">FirebaseTesting</a>
				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<Switch>
					<Route path='/ShoppingList'>
						<ShoppingList />
					</Route>
					<Route path='/AddItem'>
						<AddItem />
            {/* <AddItem token={token} /> */}
					</Route>
          <Route path='/FirebaseTesting'>
						<FirebaseTesting />
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
