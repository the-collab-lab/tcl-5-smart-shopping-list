import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ShoppingList from '../pages/ShoppingList';
import AddItem from '../pages/AddItem';

export default function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						{/* Link to be changed once pages are created*/}
						<Link to='/ShoppingList'>Shopping List</Link>
					</li>
					<li>
						<Link to='/AddItem'>Add Item</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
