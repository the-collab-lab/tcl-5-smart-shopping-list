import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);
	const [isChecked, setIsChecked] = useState(false) 

	//Thanks for sharing your code!!
	useEffect(() => {
		const db = fb.firestore();
		const tokenRef = db.collection(token);

		tokenRef
			.orderBy('timeFrame', 'asc')
			.get()
			.then(querySnapshot => {
				let fullCollection = [];
				querySnapshot.forEach(doc => {
					let documentData = doc.data();
					let nameData = documentData.itemName;
					// let itemId = documentData.id; // just needs Ids of checked items
					nameData = nameData
						.toLowerCase()
						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
						.trim()
						.replace(/\s{2,}/g, ' ');
					fullCollection.push(nameData);
				});
				setShoppingListItems(fullCollection);
				// setCheckedId(itemId) // push all checked Ids to an array
			})
			.catch(error => {
				console.log('Error getting document:', error);
			});
	}, []);

	const handleInputChange = () => { // need to change handleSubmit for more specific to item
		setIsChecked(isChecked ? false : true);
	  }

	return (
		// figure out how to check only 1 item and not all list
		<form>
			{shoppingListItems.length > 0 &&
				shoppingListItems.map(item =>
					<div>
					<li>{item}</li>
					<label>
						{item}
						<input
						   name={item}
						   type="checkbox"
						   checked={isChecked}
						   onChange={handleInputChange} />
					</label>
					</div>
				)
			}

		</form>
	);
};

export default ShoppingList;
