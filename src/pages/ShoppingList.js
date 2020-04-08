import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const userToken = token;
    let history = useHistory();


	const welcomeInstructions = () => {
		return (
			<div>
				<input
						type="checkbox"
						className="button-link"
						id="WelcomeClick"
					/>
					<label htmlFor="WelcomeClick" id="Welcome">
					Your list looks empty. Need help?
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


    const getShoppingList = () => {
        const db = fb.firestore();
        if (userToken) {
            db.collection(userToken)
                .get()
                .then(querySnapshot => {
                    let allData = [];
                    querySnapshot.forEach(doc => {
                        let data = doc.data();
                        data = {
                            isChecked: data.lastPurchaseDate
                                ? lessThan24Hours(data.lastPurchaseDate)
                                : false,
                            ...data,
                            //numberOfPurchases: pull the total number of purchases
                        };
                        allData.push(data);
                    });
                    setShoppingListItems(allData);
                });
        } else {
            history.push('/Home');
        }
    };

    useEffect(() => {
        getShoppingList();
    }, []);


    console.log("SHOPPING LIST ITEMS", shoppingListItems)

    const lessThan24Hours = date => {
        const formattedDate = parseInt(moment(date).format());
        const newDate = moment(Date.now());
        const lastPurchase = moment(formattedDate);
        return lastPurchase.diff(newDate, 'hours') < 24;
    };

    const handleCheck = e => {
        console.log("DIANE HEREEEEEEE  TIMEFRAME =============", e.target.value)
        console.log("DIANE HEREEEEEEE PURCHASE DATE =============", e.target.name)
        let db = fb.firestore();
        let tokenRef = db.collection(userToken).doc(e.target.id);
        let dataCheck = {
            isChecked: e.target.checked,
            lastPurchaseDate: moment(Date.now()).format(),
            // latestInterval: moment().startOf(e.target.name).fromNow();
            // numberOfPurchase: numberOfPurchases + 1
        };
        tokenRef.update(dataCheck).then(function() {
            getShoppingList();
        });
    };
    return (
        <div>
            <ul>
				{shoppingListItems.length>0?
					(shoppingListItems.map(item => (

						<div>
							<input
								key={item.id}
								id={item.id}
								type="checkbox"
								name={item.lastPurchaseDate}
                                value={item.timeFrame}
								checked={item.isChecked}
								onChange={handleCheck}
							/>{' '}
							{item.itemName}
						</div>
                ))):(
					welcomeInstructions()
				)}
            </ul>
        </div>
    );
};
export default ShoppingList;
