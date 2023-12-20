import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';

const NewListButton = props => {
    const onClick = event => {
        event.preventDefault();
        // const newToken = 'the collab lab';
        // ls.set('shoppingListToken', newToken);
        // props.setToken(newToken);
        console.log('Creating new lists is no longer supported.');
    };
    return (
        <Link to="/ShoppingList" onClick={onClick}>
            <Button node="button" className="NewList-button" waves="light">
                Create New List
            </Button>
        </Link>
    );
};

export default NewListButton;
