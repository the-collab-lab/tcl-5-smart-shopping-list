import React from 'react';
import getToken from '../lib/tokenGenerator';
import ls from "local-storage";
var NewListButton = (props) => {

    const onClick = (event) => {
        const newToken = getToken();
        ls.set("shoppingListToken", newToken);
        props.setToken(newToken);
    };
    return(
        <div>
            <a href="/ShoppingList" onClick={onClick}>Create a New List</a>
        </div>
    );
};

export default NewListButton;