import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [filterString, setFilterString] = useState('');
    const userToken = token;
    let history = useHistory();

    const shoppingListItemInput = item => {
        return (
            <div>
                <input
                    key={item.id}
                    id={item.id}
                    type="checkbox"
                    name={item.id}
                    value={item.isChecked}
                    checked={item.isChecked}
                    onChange={handleCheck}
                />
                {item.itemName}
            </div>
        );
    };
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
                    setShoppingListItems(allData);
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

    const handleCheck = e => {
        let db = fb.firestore();
        let tokenRef = db.collection(userToken).doc(e.target.name);
        let dataCheck = {
            isChecked: e.target.checked,
            lastPurchaseDate: moment(Date.now()).format(),
        };
        tokenRef.update(dataCheck).then(function() {
            getShoppingList();
        });
    };

    const listFilterChange = e => {
        let normalizeString = e.target.value
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .trim()
            .replace(/\s{2,}/g, ' ');
        setFilterString(normalizeString);
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
                onChange={e => setFilterString(e.target.value)}
            />
            <button>X</button>
            <ul>
                {filterString
                    ? filteredList.map(item => {
                          return (
                              <div>
                                  <input
                                      key={item.id}
                                      id={item.id}
                                      type="checkbox"
                                      name={item.id}
                                      value={item.isChecked}
                                      checked={item.isChecked}
                                      onChange={handleCheck}
                                  />
                                  {item.itemName}
                              </div>
                          );
                      })
                    : shoppingListItems.length > 0
                    ? shoppingListItems.map(item => shoppingListItemInput(item))
                    : welcomeInstructions()}
            </ul>
        </div>
    );
};
export default ShoppingList;
