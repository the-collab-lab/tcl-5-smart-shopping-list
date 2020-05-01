import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';
import calculateEstimate from '../lib/estimates';
import Modal from '../components/Modal';
import ShoppingListItem from '../components/ShoppingListItem';
import normalizeString from '../lib/normalizeString';
import '../css/ShoppingList.css';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
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
            const aName = normalizeString(a.itemName);
            const bName = normalizeString(b.itemName);
            if (aName < bName) {return -1;}
            if (aName > bName) {return 1;}
            return 0;
        }
        const seven = shoppingListArray.filter(item => item.timeFrame === 7).sort(alphabeticalSort);
        const fourteen = shoppingListArray.filter(item => item.timeFrame === 14).sort(alphabeticalSort);
        const thirty = shoppingListArray.filter(item => item.timeFrame === 30).sort(alphabeticalSort);
        const inactive = shoppingListArray.filter(item => item.timeFrame === 0).sort(alphabeticalSort);

        return seven.concat(fourteen).concat(thirty).concat(inactive);
    };
    const flagInactive = (shoppingListArray) => {
        const now = moment(Date.now());
        return shoppingListArray.map(item => {
            const initialDate = moment(item.lastPurchaseDate)
            if (now.diff(initialDate, "d") > (2*item.timeFrame)) {
                item.timeFrame = 0
            }
            return item;
        })
    }

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
                    const flaggedData = flagInactive(allData);
                    setShoppingListItems(filterShoppingListByTimeframe(flaggedData));
                });
        } else {
            // history.push('/Home');
            history.push('/');
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

    const handleCheck = (e, item) => {
        const numberOfPurchases = !item.isChecked
            ? (item.numOfPurchases || 0) + 1
            : item.numOfPurchases;

        if (!(item.lastPurchaseDate == null)) {
            let lastEstimate;
            item.nextPurchaseDate
                ? (lastEstimate = item.nextPurchaseDate)
                : (lastEstimate = item.timeFrame);
            let lastPurchaseDate = item.lastPurchaseDate;
            let today = moment(Date.now());
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
                    isChecked: e.target.checked,
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
                    numOfPurchases: numberOfPurchases,
                })
                .then(function() {
                    getShoppingList();
                });
        }
    };

    const deleteItem = item => {
        let db = fb.firestore();
        db.collection(userToken)
            .doc(item.id)
            .delete()
            .then(() => (getShoppingList(), setDeleteModal(false)));
    };

    const filteredList = shoppingListItems.filter(item => {
        return item.itemName.toLowerCase().includes(filterString.toLowerCase());
    });
    return (
        <div>

                {deleteModal ? (
                    <Modal
                        item={currentItem}
                        deleteItem={deleteItem}
                        cancelItem={() => {
                            setDeleteModal(false);
                        }}
                        type="deleteItem"
                    />
                ) : null}
                {detailModal ? (
                    <Modal
                        item={currentItem}
                        setDetailModal={setDetailModal}
                        cancelItem={() => {
                            setDetailModal(false);
                        }}
                        type="detail"
                    />
                ) : null}
            <section className='searchContainer'>
            <label><h3>Search for an item</h3></label>
            <input
            className='searchInputField'
                type="text"
                placeholder="ie. Apples"
                value={filterString}
                onChange={e => setFilterString(e.target.value)}
            />
            <button className='searchFieldEraseButton' onClick={() => setFilterString('')}>Clear search</button>
            </section>
            <tbody>
                {filterString
                    ? filteredList.map(item => {
                          return <ShoppingListItem item={item} handleCheck={handleCheck}  setCurrentItem={setCurrentItem} setDetailModal={setDetailModal} setDeleteModal={setDeleteModal} />;
                      })
                    : shoppingListItems.length > 0
                        ? shoppingListItems.map(item => <ShoppingListItem item={item} handleCheck={handleCheck} setCurrentItem={setCurrentItem} setDetailModal={setDetailModal} setDeleteModal={setDeleteModal} />)
                    : welcomeInstructions()}
            </tbody>
        </div>
    );
};
export default ShoppingList;

