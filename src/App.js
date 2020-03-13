import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';

function App() {
  return (
    <div className='App'>
      <a href="/FirebaseTesting">FirebaseTesting</a>
			<BrowserRouter>
				{/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
				<Switch>
					<Route path='/FirebaseTesting'>
						<FirebaseTesting />
					</Route>
				</Switch>
			</BrowserRouter>
    </div>

		
  );
}

export default App;
