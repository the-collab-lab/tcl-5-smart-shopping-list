import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const userToken = token;
    let history = useHistory();

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
                        console.log(
                            'Last Purchase Date: ',
                            data.lastPurchaseDate
                        );
                    });
                    setShoppingListItems(allData);
                    console.log('allData: ', allData);
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
    return (
        <div>
            <ul>
                {shoppingListItems.map(item => (
                    <div>
                        <input
                            key={item.id}
                            id={item.id}
                            type="checkbox"
                            name={item.id}
                            value={item.isChecked}
                            checked={item.isChecked}
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
