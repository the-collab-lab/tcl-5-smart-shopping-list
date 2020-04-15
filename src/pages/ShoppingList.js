import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';
import calculateEstimate from '../lib/estimates';
import ShoppingListItem from '../components/ShoppingListItem';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [filterString, setFilterString] = useState('');
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
                            Add items by clicking the "Add Item" button in the
                            bottom of the screen.
                        </li>
                        <li>
                            Your list will be sorted with most needed items
                            first.
                        </li>
                        <li>
                            To share this list with you friend, give them the
                            code "{token}"
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const filterShoppingListByTimeframe = (shoppingListArray) => {
        const alphabeticalSort = (a,b) => {
            if (a.itemName < b.itemName) {return -1;}
            if (a.itemName > b.itemName) {return 1;}
            return 0;
        }
        const seven = shoppingListArray.filter(item => item.timeFrame == 7).sort(alphabeticalSort);
        const fourteen = shoppingListArray.filter(item => item.timeFrame == 14).sort(alphabeticalSort);
        const thirty = shoppingListArray.filter(item => item.timeFrame == 30).sort(alphabeticalSort);
        
        //think about the case where timeFrame is none of these

        return seven.concat(fourteen).concat(thirty);
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
                        };
                        allData.push(data);
                    });
                    setShoppingListItems(filterShoppingListByTimeframe(allData));
                });
        } else {
            history.push('/Home');
        }
    };

    useEffect(() => {
        getShoppingList();
    }, []);

    const lessThan24Hours = date => {
        const formattedDate = parseInt(moment(date).format());
        const newDate = moment(Date.now());
        const lastPurchase = moment(formattedDate);
        return lastPurchase.diff(newDate, 'hours') < 24;
    };
 
    const handleCheck = (e,item) => {
        const numberOfPurchases = item.isChecked === false ? (item.numOfPurchases || 0) + 1 : item.numOfPurchases

        if (!(item.lastPurchaseDate == null)) {
            let lastEstimate;
            item.nextPurchaseDate
              ? (lastEstimate = item.nextPurchaseDate)
              : (lastEstimate = item.timeFrame);
            let lastPurchaseDate = item.lastPurchaseDate;
            let today = moment(Date.now())
            let lastPurchase = moment(lastPurchaseDate);
            let latestInterval = today.diff(lastPurchase, 'days');

            let db = fb.firestore();
            let nextPurchaseDate = calculateEstimate(
              item.lastEstimate,
              latestInterval,
              item.numOfPurchases
            );
            db.collection(userToken)
              .doc(e.target.name)
              .update({
                lastPurchaseDate,
                numOfPurchases: numberOfPurchases,
                latestInterval,
                lastEstimate,
                nextPurchaseDate,
                isChecked: e.target.checked
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
                  numOfPurchases: numberOfPurchases
                })
              .then(function() {
                    getShoppingList();
              });
        }
    };

    const filteredList = shoppingListItems.filter(item => {
        return item.itemName.toLowerCase().includes(filterString.toLowerCase());
    });

    return (
        <div>
            <label>Search for an item</label>
            <input
                type="text"
                placeholder="Search..."
                value={filterString}
                onChange={e => setFilterString(e.target.value)}
            />
            <button onClick={() => setFilterString('')}>X</button>
            <table>
                {filterString
                    ? filteredList.map(item => {
                          return <ShoppingListItem item={item} handleCheck={handleCheck} />;
                      })
                    : shoppingListItems.length > 0
                        ? shoppingListItems.map(item => <ShoppingListItem item={item} handleCheck={handleCheck}/>)
                    : welcomeInstructions()}
            </table>
        </div>
    );
};
export default ShoppingList;