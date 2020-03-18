import React, {useState} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';
import NewListButton from './components/newListButton'

function App() {
	const [token, setToken] = useState('')
	
	return (
		<div className='App'>
			<div>
      <a href="/FirebaseTesting">FirebaseTesting</a>
				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<NewListButton />
				<Switch>
					<Route path='/ShoppingList'>
						<ShoppingList />
					</Route>
					<Route path='/AddItem'>
						<AddItem />
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
