import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ShoppingList from '../pages/ShoppingList';
import AddItem from '../pages/AddItem';
import { Button } from 'reactstrap';

export default function App(props) {
	return (
		<div>
			<nav>
				<ul>
					<li>
						{/* Link to be changed once pages are created*/}
						<Link to='/ShoppingList'>
							<Button color='primary' size='lg'>
								Shopping List
							</Button>
						</Link>
					</li>
					<li>
						<Link to='/AddItem'>
							<Button color='primary' size='lg'>
								Add Item
							</Button>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
