import React from 'react';
import { Link } from 'react-router-dom';
import '../css/FooterTabs.css';

export default function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
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