import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ShoppingList from '../pages/ShoppingList';
import AddItem from '../pages/AddItem';
import '../css/FooterTabs.css';

export default function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						{/* Link to be changed once pages are created*/}
						<Link to='/ShoppingList'>
							<button className='navbutton'>Shopping List</button>
						</Link>
					</li>
					<li>
						<Link to='/AddItem'>
							<button className='navbutton'>Add Item</button>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}