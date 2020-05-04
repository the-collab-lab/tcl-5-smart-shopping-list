import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-materialize'

const FooterTabs= () => {
	return (
			<div className='page-footer white'>
				<div className='container center'>
						<Link to='/ShoppingList'>
							<Button
								node="button"
								waves="light"
								className='navbutton btn-large'
								>
								Shopping List
							</Button>
						</Link>
						<Link to='/AddItem'>
							<Button
								node="button"
								waves="light"
								className='navbutton btn-large'
								>
								Add Item
							</Button>
						</Link>
				</div>
			</div>
	);
}
 
export default FooterTabs;