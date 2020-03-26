import React, { useState } from 'react';
import '../App.css';
import NewListButton from '../components/NewListButton';
import * as ls from 'local-storage';
import FirebaseTesting from'./FirebaseTest';
import fb from '../lib/firebase';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import FooterTabs from '../components/FooterTabs';
import ShoppingList from './ShoppingList';
import AddItem from './AddItem';


	function Home() {
	
	const [token, setToken] = useState(ls.get('shoppingListToken'));
    const [inputToken, setInputToken] = useState('');
    const [items, setItems] = useState([]);
    console.log({ token });
    // Adds Value of token entered into inputToken
    const handleChange = e => {
        setInputToken(e.target.value);
    };
    // Checks the firestore db to see if inputToken exists
    const checkToken = e => {
        e.preventDefault();
        let db = fb.firestore();
        db.collection(`${inputToken}`)
            .get()
            .then(data => {
                if (data.empty === true) {
                    alert('Bad token, Try again or Create a New List');
                } else {
                    alert('Good token. Saving to local storage.');
                    ls.set('ShoppingListToken', { inputToken });
                    setToken({ inputToken });
                }
			});
		}
	  
	 return( <div className='App'>
            <Link to='/FirebaseTesting'>FirebaseTesting</Link>
            {token ? (
                <Redirect to='/ShoppingList' />
            ) : (
                <div className='Home-token'>
					<form>
                    <input
                        type='text'
                        name='inputToken'
                        placeholder='enter token'
                        onChange={handleChange}
                    />
                    <br />
                    <button onClick={checkToken}>Join List</button>
                    <br />
                    <NewListButton className="button" setToken={setToken} token={token} />
					</form>
                </div>
            )}
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path='/ShoppingList'>
                    <ShoppingList token={token} collectionData={items} />
                </Route>
                <Route path='/AddItem'>
                    <AddItem token={token} />
                </Route>
                <Route path='/FirebaseTesting'>
                    <FirebaseTesting />
                </Route>
            </Switch>
            <footer>
                <FooterTabs />
            </footer>
        </div>
	 )
    }


export default Home;