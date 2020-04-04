import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';
import moment from 'moment';

const today = moment().toString();
var currentDate = moment().format();
const now = moment(Date.now());

console.log('moment().toString', today);
console.log('moment().format', currentDate);
console.log('moment(Date.now()))', now);

// - if purchase date is null, create DateNow in firebase
// moment

const ShoppingList = ({ token }) => {
	const [shoppingListItems, setShoppingListItems] = useState([]);
	const [isChecked, setIsChecked] = useState(false);
	const [itemsChecked, setItemsChecked] = useState([]);
	const [purchaseDate, setPurchaseDate] = useState([]);
	// const userToken = token || 'userToken';
	const userToken = token;

	console.log('userToken: ', userToken);
	// useEffect(() => {
	// 	const db = fb.firestore();
	// 	const data = db.collection(token).get();

	// 	data.then((querySnapshot) => {
	// 		let allData = [];
	// 		querySnapshot.forEach((doc) => {
	// 			let documentData = doc.data(); // what is this?
	// 			let itemId = documentData.id;
	// 			let itemName = documentData.itemName;
	// 			let lastPurchaseDate = documentData.lastPurchaseDate;
	// 			// console.log("LAST PURCHASE DATA DOC=============", lastPurchaseDate ? true : false )
	// 			let timeFrame = documentData.timeFrame;
	// 			let full = {
	// 				id: itemId,
	// 				itemName: itemName,
	// 				lastPurchaseDate: lastPurchaseDate
	// 					? lastPurchaseDate
	// 					: null,
	// 				timeFrame: timeFrame,
	// 				//isChecked: lastPurchaseDate ? isChecked(lastPurchaseDate) : false
	// 			};
	// 			allData.push(full);
	// 		});
	// 		setShoppingListItems(allData);
	// 	});
	// 	getChecked();
	// }, []);

	useEffect(() => {
		const db = fb.firestore();
		db.collection(userToken)
			.get()
			.then((querySnapshot) => {
				let allData = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					allData.push(data);
					console.log('doc: ', doc.id);
				});
				setShoppingListItems(allData);
				console.log('allData: ', allData);
			});
	}, [userToken]);

	// const getChecked = () => {
	// 	console.log('FUUUUULL SHOPPING LIST ITEMS DATA +++', shoppingListItems);
	//  console.log("TTTTTTTTTTTT=========", )
	// console.log("LAST PURCHASE DATE", lastPurchaseDate)
	// };

	//take lastPurchastDate and check if it's 24 hours
	//const isChecked = (date)=> {if date was in last 24 hours, then return true, otherwise return false} no database

	// const handleCheck = (e) => {
	// 	setIsChecked(e.target.checked);
	// 	console.log(isChecked);
	// 	let db = fb.firestore();
	// 	// let tokenRef = db.collection(userToken).doc(e.target.name)
	// 	let tokenRef = db.collection(userToken).doc(e.target.id);
	// 	let dataCheck = {
	// 		isChecked: e.target.checked,
	// 	};
	// 	tokenRef.update(dataCheck).then(function() {
	// 		console.log('Document successfully updated!');
	// 	});
	// - check needs to save to firestore (true/false) to permeate sessions
	// - when checking, update lastPurchaseDate for that item and id, creates new if null

	// Create an initial document to update.
	// var frankDocRef = db.collection(tokenRef).doc("frank");
	// frankDocRef.set({
	//     name: "Frank",
	//     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
	//     age: 12
	// });

	// // To update age and favorite color:
	// db.collection("users").doc("frank").update({
	//     "age": 13,
	//     "favorites.color": "Red"
	// })
	// };

	/* 
		Cohort 4 based the check box being true or false depending on if the last time the item was bought was more than or less than 24 hours ago
		If the time you purchased the item is less than the current time, then CHECKED was true
		If the time you purchased the item is more than the current time, then CHECKED was false
		We just need to create the logic for setting the current time/date for the item when it is checked
		Then we calculate the times

	*/

	const lessThan24Hours = (item) => {
		let newDay = new Date();
		if (item.lastPurchaseDate) {
			return (
				newDay.getTime() / 1000 - item.lastPurchaseDate.seconds < 86400
			); // number of seconds in 24hours
		} else {
			return false;
		}
	};

	const handleCheck = (e) => {
		let db = fb.firestore();
		db.collection(userToken)
			.doc(e.target.id)
			.update({
				lastPurchaseDate: Date.now,
			});
	};

	return (
		<div>
			<ul>
				{shoppingListItems.map((item) => (
					<div>
						<input
							key={item.id}
							id={item.id}
							type='checkbox'
							name={item.id}
							value={isChecked}
							checked={lessThan24Hours(item)} //state isChecked??
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
