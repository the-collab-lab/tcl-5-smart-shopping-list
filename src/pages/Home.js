import React from 'react';
import NewListButton from '../components/NewListButton';
import { Link, Redirect } from 'react-router-dom';

function Home({ token, setToken }) {
    return (
        <section className="Home">
            <h1 className="Home-h1">Never forget your groceries again.</h1>
            <h2 className="Home-h2-1">Grab a token by creating a new list.</h2>
            <img src="/img/004-groceries-1.png"/>
            <NewListButton
                className="button"
                setToken={setToken}
                token={token}
            />
            <p>
                <h2 className="Home-h2">
                    or if you a token, you can {' '}
                    <Link to="/JoinList">join an existing list.</Link>
                </h2>
            </p>
            {token ? <Redirect to="/ShoppingList" /> : null}
        </section>
    );
}
export default Home;
