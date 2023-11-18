import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fb from '../lib/firebase';
import moment from 'moment';
import calculateEstimate from '../lib/estimates';
import ShoppingListItem from '../components/ShoppingListItem';
import normalizeString from '../lib/normalizeString';
import { Modal } from 'react-materialize';

const ShoppingList = ({ token }) => {
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        itemName: ' ',
        nextPurchaseDate: moment(),
        lastPurchase: moment(),
        numOfPurchases: 0,
    });
    const userToken = token;
    let history = useHistory();

    const welcomeInstructions = () => {
        return (
            <div className="welcomeContainer">
                <input
                    type="checkbox"
                    className="button-link"
                    id="WelcomeClick"
                />
                <img src="/img/purchase.png" alt="Empty Shopping List Basket" />
                <br />
                <label
                    htmlFor="WelcomeClick"
                    id="Welcome"
                    className="welcomeLabel"
                >
                    Your list looks empty. Need help?
                </label>
                <div id="hideWelcome">
                    <ul>
                        <li>1) Add a new item to remember to buy it.</li>
                        <li>
                            2) View all your items in the shopping list tab.
                        </li>
                        <li>Happy Shopping!</li>
                    </ul>
                </div>
            </div>
        );
    };

    const filterShoppingListByTimeframe = shoppingListArray => {
        const alphabeticalSort = (a, b) => {
            const aName = normalizeString(a.itemName);
            const bName = normalizeString(b.itemName);
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        };
        const seven = shoppingListArray
            .filter(item => item.timeFrame === 7)
            .sort(alphabeticalSort);
        const fourteen = shoppingListArray
            .filter(item => item.timeFrame === 14)
            .sort(alphabeticalSort);
        const thirty = shoppingListArray
            .filter(item => item.timeFrame === 30)
            .sort(alphabeticalSort);
        const inactive = shoppingListArray
            .filter(item => item.timeFrame === 0)
            .sort(alphabeticalSort);

        return seven
            .concat(fourteen)
            .concat(thirty)
            .concat(inactive);
    };
    const flagInactive = shoppingListArray => {
        const now = moment(Date.now());
        return shoppingListArray.map(item => {
            const initialDate = moment(item.lastPurchaseDate);
            if (now.diff(initialDate, 'd') > 2 * item.timeFrame) {
                item.timeFrame = 0;
            }
            return item;
        });
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
                    const flaggedData = flagInactive(allData);
                    setShoppingListItems(
                        filterShoppingListByTimeframe(flaggedData)
                    );
                });
        } else {
            // history.push('/Home');
            history.push('/');
        }
    };

    useEffect(() => {
        getShoppingList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            .then(() => {
                getShoppingList();
                setDeleteModal(false);
            });
    };

    const filteredList = shoppingListItems.filter(item => {
        return item.itemName.toLowerCase().includes(filterString.toLowerCase());
    });

    const searchLength = () => {
        if (shoppingListItems.length > 0)
            return (
                <div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                className="searchInputField"
                                type="text"
                                placeholder="Search for an item"
                                value={filterString}
                                onChange={e => setFilterString(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="searchFieldEraseButton"
                        onClick={() => setFilterString('')}
                    >
                        Clear search
                    </button>
                </div>
            );
    };

    return (
        <div>
            <section className="shareContainer">
                Here's your token to share with a friend:
                <h1>{token}</h1>{' '}
            </section>

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
            <section className="searchContainer">
                {searchLength()}

                <tbody className="shoppingListContainer">
                    {filterString
                        ? filteredList.map(item => {
                              return (
                                  <ShoppingListItem
                                      item={item}
                                      handleCheck={handleCheck}
                                      currentItem={currentItem}
                                      setCurrentItem={setCurrentItem}
                                      detailModal={detailModal}
                                      setDetailModal={setDetailModal}
                                      setDeleteModal={setDeleteModal}
                                      deleteItem={deleteItem}
                                  />
                              );
                          })
                        : shoppingListItems.length > 0
                        ? shoppingListItems.map(item => (
                              <ShoppingListItem
                                  item={item}
                                  handleCheck={handleCheck}
                                  currentItem={currentItem}
                                  setCurrentItem={setCurrentItem}
                                  detailModal={detailModal}
                                  setDetailModal={setDetailModal}
                                  setDeleteModal={setDeleteModal}
                                  deleteItem={deleteItem}
                              />
                          ))
                        : welcomeInstructions()}
                </tbody>
            </section>
        </div>
    );
};
export default ShoppingList;
