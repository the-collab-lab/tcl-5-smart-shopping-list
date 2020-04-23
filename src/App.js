import React, { useState } from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import FirebaseTesting from './pages/FirebaseTest';
import FooterTabs from './components/FooterTabs';
import ShoppingList from './pages/ShoppingList';
import AddItem from './pages/AddItem';
import fb from './lib/firebase';
import * as ls from 'local-storage';
import Home from './pages/Home';
import JoinList from './pages/JoinList';

function App() {
    const [token, setToken] = useState(ls.get('shoppingListToken'));
    const [inputToken, setInputToken] = useState('');

    const history = useHistory();

    const handleChange = e => {
        setInputToken(e.target.value);
    };

    const checkToken = e => {
        let db = fb.firestore();
        if (inputToken.length === 0) {
            alert('You must enter a token value.  Try again! ');
        } else {
            db.collection(`${inputToken}`)
                .get()
                .then(data => {
                    if (data.empty === true) {
                        alert('Bad token, Try again or Create a New List');
                    } else {
                        ls.set('ShoppingListToken', inputToken);
                        setToken(inputToken);
                        history.push('/ShoppingList');
                    }
                });
        }
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Home token={token} setToken={setToken} />
                </Route>
                <Route path="/ShoppingList">
                    <ShoppingList token={token} />
                </Route>
                <Route path="/AddItem">
                    <AddItem token={token} />
                </Route>
                <Route path="/FirebaseTesting">
                    <FirebaseTesting />
                </Route>
                <Route path="/JoinList">
                    <JoinList
                        handleChange={handleChange}
                        checkToken={checkToken}
                        inputToken={inputToken}
                    />
                </Route>
            </Switch>
            <footer>
                {token ? <FooterTabs /> : ' '}
            </footer>
        </div>
    );
}

export default App;
