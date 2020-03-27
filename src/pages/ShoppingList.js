import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);

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
	}, []);
	return (
		<ul>
			{shoppingListItems.length > 0 && shoppingListItems.map(item => (
				<li>{item}</li>
			))}
		</ul>
	);
};

export default ShoppingList;
