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
	console.log('items: ', shoppingListItems);
	// console.log(shoppingListItems[0].itemName);

	return (
		// figure out how to check only 1 item and not all list
		<div>
			<ul>
				{shoppingListItems.map(item => (
					<li key={item.id}>{item.itemName}</li>
				))}
			</ul>
		</div>
	);
};

export default ShoppingList;

// import React, { useState, useEffect } from 'react';
// import fb from '../lib/firebase';

// const ShoppingList = ({ token }) => {
// 	const [shoppingListItems, setShoppingListItems] = useState([]);
// 	const [isChecked, setIsChecked] = useState(false);
// 	const [itemsChecked, setItemsChecked] = useState([]);

// 	//Thanks for sharing your code!!
// 	useEffect(() => {
// 		const db = fb.firestore();
// 		const tokenRef = db.collection(token);

// 		tokenRef
// 			.orderBy('timeFrame', 'asc')
// 			.get()
// 			.then(querySnapshot => {
// 				let fullCollection = [];
// 				querySnapshot.forEach(doc => {
// 					let documentData = doc.data();
// 					let nameData = documentData.itemName;
// 					// let itemId = documentData.id; // just needs Ids of checked items
// 					nameData = nameData
// 						.toLowerCase()
// 						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
// 						.trim()
// 						.replace(/\s{2,}/g, ' ');
// 					fullCollection.push(nameData);
// 				});
// 				setShoppingListItems(fullCollection);
// 				// setCheckedId(itemId) // push all checked Ids to an array
// 			})
// 			.catch(error => {
// 				console.log('Error getting document:', error);
// 			});
// 	}, []);

// 	console.log('items: ', shoppingListItems);

// 	const handleInputChange = (e, id) => {
// 		// need to change handleSubmit for more specific to item
// 		// setIsChecked(isChecked ? false : true);
// 		// console.log(e.target.value);
// 		// console.log(e.target.id);
// 		// if (e.target.value) {
// 		// 	setIsChecked(isChecked ? false : true);
// 		// }
// 	};

// 	return (
// 		// figure out how to check only 1 item and not all list
// 		<form>
// 			{shoppingListItems.length > 0 &&
// 				shoppingListItems.map(item => (
// 					<div>
// 						<label>
// 							{item}
// 							<input
// 								id={item.id}
// 								name={item}
// 								value={item}
// 								type='checkbox'
// 								checked={isChecked}
// 								onClick={handleInputChange}
// 							/>
// 						</label>
// 					</div>
// 				))}
// 		</form>
// 	);
// };

// export default ShoppingList;
