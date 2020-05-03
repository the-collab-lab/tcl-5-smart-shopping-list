import React from 'react';
import NewListButton from '../components/NewListButton';
import { Link, Redirect } from 'react-router-dom';

function Home({ token, setToken }) {
    return (
        <div className="Home">
            <img src="/img/006-food-basket.png"></img>
            <h1 className="Home-h1">Welcome to My Shopping List</h1>
            <h2>Tap "Create a New List" to get started</h2>
            <NewListButton
                className="button"
                setToken={setToken}
                token={token}
            />
            <p>
                <h2 className="Home-h2">
                    You can even{' '}
                    <Link to="/JoinList">join an existing list.</Link>
                </h2>
            </p>
            {token ? <Redirect to="/ShoppingList" /> : null}
        </div>
    );
}
export default Home;
