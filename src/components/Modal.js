import React from 'react';
import '../App.css';

const Modal = ({ type, item, deleteItem, cancelItem, setDetailModal }) => {
    let output;

    if (type === 'deleteItem') {
        output = (
            <div className="Modal">
                <p> Are you sure you want to delete {item.itemName}?</p>
                <button onClick={() => deleteItem(item)}>YES</button>
                <button onClick={() => cancelItem()}>No</button>
            </div>
        );
    } else if (type === 'detail') {
        output = (
            <div className="detailsModal">
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
    }

    return output;
};

export default Modal;
