import React from 'react';
import {Link} from 'react-router-dom';
import getToken from '../lib/tokenGenerator';
import * as ls from 'local-storage';
var NewListButton = props => {
	const onClick = event => {
		const newToken = getToken();
		ls.set('shoppingListToken', newToken);
		props.setToken(newToken);
	};
	return (
		<div>
			<Link href='/ShoppingList' onClick={onClick}>
				Create a New List
			</Link>
		</div>
	);
};

export default NewListButton;
