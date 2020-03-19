import React, {useState} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';
import NewListButton from './components/newListButton'
import * as ls from 'local-storage';

function App() {
	const [token, setToken] = useState(ls.get("shoppingListToken"));
	
	return (
		<div className='App'>
			
      <a href="/FirebaseTesting">FirebaseTesting</a>
			{token?<Redirect to="/ShoppingList" />:<NewListButton setToken={setToken} token={token} />}
				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<BrowserRouter>
				<Switch>
					<Route path='/ShoppingList'>
						<ShoppingList token={token}/>
					</Route>
					<Route path='/AddItem'>
						<AddItem />
					</Route>
          <Route path='/FirebaseTesting'>
						<FirebaseTesting />
					</Route>
				</Switch>
				</BrowserRouter>

			<footer>
				<FooterTabs />
			</footer>
		</div>
	);
}

export default App;
