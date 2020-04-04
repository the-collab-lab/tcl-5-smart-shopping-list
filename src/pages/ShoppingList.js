import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);

	const welcomeInstructions = () => {
		return (
			<div>
				<input
						type="checkbox"
						className="button-link"
						id="WelcomeClick"
					/>
					<label htmlFor="WelcomeClick" id="Welcome">
					You're list looks empty. Need help?
					</label>
					<div id="hideWelcome">
						<ul>
							<li>
							Add items by clicking the "Add Item" button in the bottom of the screen.
							</li>
							<li>
							Your list will be sorted with most needed items first.
							</li>
							<li>
							To share this list with you friend, give them the code "{token}"
							</li>
						</ul>
					</div>	
				</div>
			
		);
	};

	//Thanks for sharing your code!!
	useEffect(() => {
		const db = fb.firestore();
		if(token){
			const tokenRef = db.collection(token);

		tokenRef
			.orderBy('timeFrame', 'asc')
			.get()
			.then(querySnapshot => {
				let fullCollection = [];
				querySnapshot.forEach(doc => {
					let documentData = doc.data();
					let nameData = documentData.itemName;
					nameData = nameData
						.toLowerCase()
						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
						.trim()
						.replace(/\s{2,}/g, ' ');
					fullCollection.push(nameData);
				});
				setShoppingListItems(fullCollection);
			})
			.catch(error => {
				console.log('Error getting document:', error);
			});
		}
	}, []);
	return (
		<div>
		{shoppingListItems.length > 0 ? 
			(
				<ul>
				{shoppingListItems.map(item => <li>{item}</li>)}
				</ul> 
			) : ( 
				welcomeInstructions()
		)}
		</div>
	);
};

export default ShoppingList;
