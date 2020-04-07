import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import fb from '../lib/firebase';
import '../css/AddItemForm.css';
import moment from 'moment';

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
                            nameData = nameData
                                .toLowerCase()
                                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
                                .trim()
                                .replace(/\s{2,}/g, ' ');

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
        let normalizeItemName = itemName
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .trim()
            .replace(/\s{2,}/g, ' ');
        if (!shoppingListCollection.includes(normalizeItemName)) {
            let data = {
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
                    <div>
                        <h1>Name of the item</h1>
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
                        <h1>How soon are you likely to buy it again?</h1>
                    </div>
                    <select
                        name="time frame"
                        onChange={e => setTimeFrame(e.target.value)}
                    >
                        <option value={7}>Soon (in the next 7 days)</option>
                        <option value={14}>
                            Kind of soon (in the next 14 days)
                        </option>
                        <option value={30}>
                            Not soon (in the next 30 days)
                        </option>
                    </select>

                    <div>
                        <h1>Last purchase date?</h1>
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
                    <input type="submit" />
                </form>
            )}
        </div>
    );
};

export default Form;
