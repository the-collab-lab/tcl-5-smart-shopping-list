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
	const userToken = token;

	console.log('userToken: ', userToken);

	const getShoppingList = () => {
		const db = fb.firestore();
		db.collection(userToken)
			.get()
			.then((querySnapshot) => {
				let allData = [];
				querySnapshot.forEach((doc) => {
					let data = doc.data();
					data = {
						isChecked: data.lastPurchaseDate
							? lessThan24Hours(data.lastPurchaseDate)
							: false,
						...data,
					};
					allData.push(data);
					console.log('Last Purchase Date: ', data.lastPurchaseDate);
				});
				setShoppingListItems(allData);
				console.log('allData: ', allData);
			});
	};
	useEffect(() => {
		getShoppingList();
	}, [userToken, isChecked]);

	/* 
		Cohort 4 based the check box being true or false depending on if the last time the item was bought was more than or less than 24 hours ago
		If the time you purchased the item is less than the current time, then CHECKED was true
		If the time you purchased the item is more than the current time, then CHECKED was false
		We just need to create the logic for setting the current time/date for the item when it is checked
		Then we calculate the times

	*/

	const lessThan24Hours = (date) => {
		const formattedDate = parseInt(moment(date).format());
		const newDate = moment(Date.now());
		const lastPurchase = moment(formattedDate);
		return lastPurchase.diff(newDate, 'hours') < 24;
	};

	const handleCheck = (e) => {
		setIsChecked(e.target.checked);
		console.log(isChecked);
		let db = fb.firestore();
		let tokenRef = db.collection(userToken).doc(e.target.name);
		let dataCheck = {
			isChecked: e.target.checked,
			lastPurchaseDate: moment(Date.now()).format(),
		};
		tokenRef.update(dataCheck).then(function() {
			console.log('Document successfully updated!');
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
							value={item.isChecked}
							checked={item.isChecked} //state isChecked??
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
