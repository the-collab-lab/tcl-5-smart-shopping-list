import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';

// - if purchase date is null, create DateNow in firebase
// moment

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [itemsChecked, setItemsChecked] = useState([]);

	useEffect(() => {
		const db = fb.firestore();
		const data = db.collection(token).get();

		data.then(querySnapshot => {
			let allData = [];
			querySnapshot.forEach(doc => {
				let documentData = doc.data(); // what is this?
				let itemId = documentData.id;
				let itemName = documentData.itemName;
				let lastPurchaseDate = documentData.lastPurchaseDate;
				let timeFrame = documentData.timeFrame;
				let full = {
					id: itemId,
					itemName: itemName,
					lastPurchaseDate: lastPurchaseDate,
					timeFrame: timeFrame,
					//isChecked: lastPurchaseDate ? isChecked(lastPurchaseDate) : false
				};
				allData.push(full);
			});
			setShoppingListItems(allData);
		});
		// call function isChecked();
	}, []);

 function isChecked()
 //take lastPurchastDate and check if it's 24 hours
//const isChecked = (date)=> {if date was in last 24 hours, then return true, otherwise return false} no database

	const handleCheck = e => {
		console.log(e.target.value)
		// - check needs to save to firestore (true/false) to permeate sessions
		// - when checking, update lastPurchaseDate for that item and id, creates new if null
	};

	return (
		<div>
			<ul>
				{shoppingListItems.map(item => (
					<div>
						<input
							type='checkbox'
							name={item.itemName}
							//value={item.isChecked}
							//checked={item.isChecked}
							onChange={handleCheck}
						/>{' '}
						{item.itemName}
					</div>
				))}
			</ul>
		</div>
	);
};

export default ShoppingList;
