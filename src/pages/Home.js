import React from 'react';
import '../css/Home.css';
import NewListButton from '../components/NewListButton';
import { Link, Redirect } from 'react-router-dom';

function Home({ token, setToken }) {
    return (
        <div className="Home">
            <h1>Welcome to your smart shopping list!</h1>
            <h2>Tap "Create shopping list" to get started</h2>
            <NewListButton
                className="button"
                setToken={setToken}
                token={token}
            />
            <p>
                <h2>
                    You can even{' '}
                    <Link to="/JoinList">join an existing list.</Link>
                </h2>
            </p>
            {token ? <Redirect to="/ShoppingList" /> : null}
        </div>
    );
}
export default Home;
