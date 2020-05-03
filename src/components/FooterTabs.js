import React from 'react';
import { Link } from 'react-router-dom';

const FooterTabs= () => {
	return (
			<div class='page-footer white'>
				<div className='container center'>
						<Link to='/ShoppingList'>
						<button className='navbutton'>Shopping List</button>
						</Link>
						<Link to='/AddItem'>
						<button className='navbutton'>Add Item</button>
						</Link>
				</div>
			</div>
	);
}
 
export default FooterTabs;