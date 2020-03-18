import React from 'react';
import getToken from '../lib/tokenGenerator';

var NewListButton = (props) => {

    const onClick = (event) => {
        const token = getToken();
        
    };
    return(
        <div>
            <a href="/ShoppingList" onClick={onClick}>Create a New List</a>
        </div>
    );
};

export default NewListButton;