import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';
import calculateEstimate from '../lib/estimates';
<<<<<<< HEAD

const HOURS24 = 86400; //24 hours in seconds

=======
const HOURS24 = 86400; //24 hours in seconds
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const userToken = token;
    let history = useHistory();
<<<<<<< HEAD
  
  
    
=======
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
    /*const handleChange = (e, item) => {
        if (item.datePurchased) {
          let lastEstimate;
          item.nextPurchaseDate
            ? (lastEstimate = item.nextPurchaseDate)
            : (lastEstimate = item.frequency);
          let lastDatePurchased = item.datePurchased;
          //lastPurchaseDate: moment(Date.now()).format(),
          let datePurchased = new Date();
          let datePurchasedInSeconds = Math.floor(datePurchased.getTime() / 1000);
          let latestInterval = Math.floor(
            (datePurchasedInSeconds - lastDatePurchased.seconds) / HOURS24 //lessThan24Hours 
          );
          let db = fb.firestore();
          let nextPurchaseDate = calculateEstimate(
            item.lastEstimate,
            latestInterval,
            item.numOfPurchases
          );
          db.collection(userToken)
            .doc(e.target.value)
            .update({
              datePurchased,
              numOfPurchases: item.numOfPurchases + 1,
              latestInterval,
              lastEstimate,
              nextPurchaseDate
            });
        } else {
          let datePurchased = new Date();
          let db = fb.firestore();
          db.collection((userToken)
            .doc(e.target.value)
            .update({ datePurchased, numOfPurchases: item.numOfPurchases + 1 }):
        }    
    };*/
<<<<<<< HEAD


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


=======
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
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
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
                            //numberofPurchases:pull the total no.of Purchases
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
<<<<<<< HEAD


    console.log("SHOPPING LIST ITEMS", shoppingListItems);


=======
    console.log("SHOPPING LIST ITEMS", shoppingListItems);
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
    const lessThan24Hours = date => {
        const formattedDate = parseInt(moment(date).format());
        const newDate = moment(Date.now());
        const lastPurchase = moment(formattedDate);
        return lastPurchase.diff(newDate, 'hours') < 24;
    };
<<<<<<< HEAD

    const handleCheck = e => {

=======
    const handleCheck = (e,item) => {
        console.log("ITEMMMMMM", item)
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
        if (item.lastPurchaseDate) {
            let lastEstimate;
            item.nextPurchaseDate
              ? (lastEstimate = item.nextPurchaseDate)
              : (lastEstimate = item.timeFrame);
            let lastPurchaseDate = item.lastPurchaseDate;
            //lastPurchaseDate: moment(Date.now()).format(),
            let datePurchased = new Date();
            let datePurchasedInSeconds = Math.floor(datePurchased.getTime() / 1000);
            let latestInterval = Math.floor(
              (datePurchasedInSeconds - lastPurchaseDate.seconds) / HOURS24 //lessThan24Hours 
            );
            let db = fb.firestore();
            let nextPurchaseDate = calculateEstimate(
              item.lastEstimate,
              latestInterval,
              item.numOfPurchases
            );
            db.collection(userToken)
              .doc(e.target.value)
              .update({
                lastPurchaseDate,
                numOfPurchases: item.numOfPurchases + 1,
                latestInterval,
                lastEstimate,
                nextPurchaseDate,
                isChecked: e.target.checked
<<<<<<< HEAD
              });
          } else {
            let lastPurchaseDate = moment(Date.now()).format();
            let db = fb.firestore();
            db.collection((userToken)
              .doc(e.target.name)
              .update(lastPurchaseDate, numOfPurchases: item.numOfPurchases + 1 )
          }    
      };



=======
              })
              .then(function() {
                getShoppingList();
            });
          } else {
            let lastPurchaseDate = moment(Date.now()).format();
            let db = fb.firestore();
            db.collection(userToken)
              .doc(e.target.name)
              .update({
                  isChecked: e.target.checked,
                  lastPurchaseDate, 
                  numOfPurchases:item.numOfPurchases + 1 
                })
              .then(function() {
                    getShoppingList();
              });
        }
    };
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
        /*console.log("DIANE HEREEEEEEE  TIMEFRAME =============", e.target.value)
        console.log("DIANE HEREEEEEEE PURCHASE DATE =============", e.target.name)
        let db = fb.firestore();
        let tokenRef = db.collection(userToken).doc(e.target.name);
        let dataCheck = {
            isChecked: e.target.checked,
            lastPurchaseDate: moment(Date.now()).format(),
            //latestInterval:
            //latestInterval: moment().startOf(e.target.name).fromNow();
            //numberofPurchases: numberofPurchases +1;
        };
        tokenRef.update(dataCheck).then(function() {
            getShoppingList();
        });
    };*/
    return (
        <div>
            <ul>
<<<<<<< HEAD
				{shoppingListItems.length>0?
					(shoppingListItems.map(item => (
						<div>
							<input
								key={item.id}
								id={item.id}
								type="checkbox"
								name={item.id}
                                value={item.isChecked}
                                //name={item.lastPurchaseDate} to pull LAst Purchase date data
                                //value={item.timeFrame} to pull timeFrame data
								checked={item.isChecked}
                                onChange={e => handleCheck(e, item)}
                        }
							/>{' '}
							{item.itemName}
						</div>
=======
        {shoppingListItems.length>0?
          (shoppingListItems.map(item => (
            <div>
              <input
                key={item.id}
                id={item.id}
                type="checkbox"
                name={item.id}
                                value={item.isChecked}
                                //name={item.lastPurchaseDate} to pull LAst Purchase date data
                                //value={item.timeFrame} to pull timeFrame data
                checked={item.isChecked}
                onChange={e => handleCheck(e, item)}
              />{' '}
              {item.itemName}
            </div>
>>>>>>> 4d4f3da416d2347224c6a10196dfec819026b2a8
                ))):(
          welcomeInstructions()
        )}
            </ul>
        </div>
    
    );
};
export default ShoppingList;