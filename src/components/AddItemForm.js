import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';
import normalizeString from '../lib/normalizeString';
import {Button,Icon, Select} from 'react-materialize'

const Form = ({ token }) => {
    const [itemName, setItemName] = useState('');
    const [timeFrame, setTimeFrame] = useState(7);
    const [lastPurchaseDate, setLastPurchaseDate] = useState(null);
    const userToken = token || 'faust lamar uptake';
    const [shoppingListCollection, setShoppingListCollection] = useState([]);
    const [duplicateError, setDuplicateError] = useState(false);
    const [addStatus, setAddStatus] = useState(false);

    const getCurrentShoppingListItems = currentToken => {
        const db = fb.firestore();
        const tokenRef = db.collection(currentToken);

        tokenRef
            .orderBy('timeFrame', 'asc')
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    let fullCollection = [];
                    querySnapshot.forEach(doc => {
                        let documentData = doc.data();
                        let nameData = documentData.itemName;
                        if (nameData) {
                            nameData = normalizeString(nameData)
                            fullCollection.push(nameData);
                        }
                    });
                    setShoppingListCollection(fullCollection);
                }
            })
            .catch(error => {
                console.log('Error getting document:', error);
            });
    };
    useEffect(() => {
        getCurrentShoppingListItems(userToken);
    }, [token, addStatus]);

    const handleSubmit = e => {
        e.preventDefault();
        setDuplicateError(false);
        let db = fb.firestore();
        let tokenRef = db.collection(userToken);
        let normalizeItemName = normalizeString(itemName);
        if (!shoppingListCollection.includes(normalizeItemName)) {
            let data = {
                numOfPurchases: 0,
                itemName,
                timeFrame: parseInt(timeFrame),
                lastPurchaseDate: lastPurchaseDate
                    ? moment(lastPurchaseDate).format()
                    : null,
                isChecked: false,
            };
            tokenRef
                .add(data)
                .then(docRef => {
                    tokenRef.doc(docRef.id).update({ id: docRef.id });
                    getCurrentShoppingListItems(userToken);
                    setAddStatus(true);
                    alert(' Item Added!🙌');
                    if(!alert('Item Added!🙌')){window.location.reload();}
                })
                .catch(error =>
                    console.error('Error writing document: ', error)
                );
        } else {
            setDuplicateError(true);
        }
    };

    const renderRedirect = () => {
        setAddStatus(false);
        return <Redirect to="/AddItem" />;
    };

    return (
        <div>
            {addStatus ? (
                renderRedirect()
            ) : (
                <form id="addItemForm" onSubmit={e => handleSubmit(e)}>
                <div><h1>Add a new item to your list.</h1></div>
                <img src="/img/005-shopping-basket.png" alt="Shopping List Basket"/>
                    <div>
                        <h2>Name of the item</h2>
                    </div>
                    <input
                        name="item name"
                        type="text"
                        placeholder="ie: apple"
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                        required
                    />

                    <div>
                        <h2>How soon will you need it again?</h2>
                    </div>
                    <Select
                        id="Select-9"
                        multiple={false}
                        name="time frame"
                        onChange={e => setTimeFrame(e.target.value)}
                        >
                        <option
                            disabled
                            value=""
                        >
                            Choose your option
                        </option>
                        <option value={7}>
                        Soon (in the next 7 days)
                        </option>
                        <option value={14}>
                        Kind of soon (in the next 14 days)
                        </option>
                        <option value={30}>
                        Not soon (in the next 30 days)
                        </option>
                        </Select>
                    <div>
                        <h2>Last purchase date?</h2>
                    </div>
                    <input
                        type="date"
                        name="last purchase date"
                        placeholder="Last Purchase Date"
                        value={lastPurchaseDate}
                        onChange={e => setLastPurchaseDate(e.target.value)}
                    />

                    {duplicateError ? (
                        <div className="errorMessage">
                            There is a duplicate item in your shopping list.
                        </div>
                    ) : null}
                    <Button
                    node="button"
                    type="submit"
                    waves="light"
                    >
                    Submit
                    <Icon right>
                        send
                    </Icon>
                    </Button>

                </form>
            )}
        </div>
    );
};

export default Form;
