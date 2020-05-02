import React from 'react';
import '../App.css';

const Modal = ({ type, token, item, deleteItem, cancelItem, setDetailModal, setEmptyListModal }) => {
    let output;

    if (type === 'deleteItem') {
        output = (
            <div className="modal">
                <p> Are you sure you want to delete {item.itemName}?</p>
                <button onClick={() => deleteItem(item)}>YES</button>
                <button onClick={() => cancelItem()}>No</button>
            </div>
        );
    } else if (type === 'detail') {
        output = (
            <div className="modal detailsModal">
                <h1>Purchase Details</h1>
                <h2>{item.itemName}</h2>
                <ul>
                    <li>
                        Last purchase:{' '}
                        <p>
                            {' '}
                            {item.lastPurchaseDate
                                ? item.lastPurchaseDate
                                : 'None'}
                        </p>
                    </li>
                    <li>
                        Next purchase:{' '}
                        {
                            <p>
                                {item.nextPurchaseDate
                                    ? item.nextPurchaseDate
                                    : 'None'}
                            </p>
                        }
                    </li>
                    <li>
                        Number of purchases:
                        <p id="itemDetails">{item.numOfPurchases}</p>
                    </li>
                </ul>
                <button onClick={() => setDetailModal(false)}>Back</button>
            </div>
        );
    } else if (type === 'emptyList'){
        output =      
        <div className="modal emptyListModal">
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
    }

    return output;
};

export default Modal;
