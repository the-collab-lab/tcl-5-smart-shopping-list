import React, { useEffect } from 'react';
import NewListButton from '../components/NewListButton';
import { Link, Redirect } from 'react-router-dom';

function Home({ token, setToken }) {
    /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
    useEffect(() => {
        alert(
            'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.'
        );
    }, []);
    return (
        <section className="Home">
            <h1 className="Home-h1">Never forget your groceries again.</h1>
            <h2 className="Home-h2-1">Grab a token by creating a new list.</h2>
            <img src="/img/004-groceries-1.png" alt="Shopping List Basket" />
            <NewListButton
                className="button"
                setToken={setToken}
                token={token}
            />
            <p>
                <h2 className="Home-h2">
                    or if you a token, you can{' '}
                    <Link to="/JoinList">join an existing list.</Link>
                </h2>
            </p>
            {token ? <Redirect to="/ShoppingList" /> : null}
        </section>
    );
}
export default Home;
