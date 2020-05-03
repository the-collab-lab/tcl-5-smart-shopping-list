import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-materialize'

const FooterTabs= () => {
	return (
			<div class='page-footer white'>
				<div className='container center'>
						<Link to='/ShoppingList'>
						<Button
						node="button"
						waves="light"
						className='navbutton btn-large'
						>
						Shopping List
						</Button>
						{/* <button className='navbutton'>Shopping List</button> */}
						</Link>
						<Link to='/AddItem'>
						<Button
						node="button"
						waves="light"
						className='navbutton btn-large'
						>
						Add Item
						</Button>
						{/* <button className='navbutton'>Add Item</button> */}
						</Link>
				</div>
			</div>
	);
}
 
export default FooterTabs;