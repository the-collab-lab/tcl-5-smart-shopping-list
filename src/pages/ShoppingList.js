import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [itemsChecked, setItemsChecked] = useState([]);

	//Thanks for sharing your code!!
	useEffect(() => {
		const db = fb.firestore();
		const data = db.collection(token).get();

		data.then(querySnapshot => {
			let allData = [];
			querySnapshot.forEach(doc => {
				let documentData = doc.data();
				let itemId = documentData.id;
				let itemName = documentData.itemName;
				let full = {
					id: itemId,
					itemName: itemName
				};
				allData.push(full);
			});
			setShoppingListItems(allData);
		});
	}, []);

	const handleCheck = e => {
		alert(e.target.value);
	};

	return (
		<div>
			<ul>
				{shoppingListItems.map(item => (
					<div>
						<input
							type='checkbox'
							value={item.itemName}
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
