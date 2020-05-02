import React from 'react';
import '../App.css';


const Modal = ({ type, item, deleteItem, cancelItem, setDetailModal, setCurrentItem , setDeleteModal , setSuccessModal }) => {
    let output;

    if (type ==='delete')
    output = (
            <div className="DeleteModal">
                <p> Are you sure you want to delete {item.itemName}?</p>
                <button onClick={() => deleteItem(item)}>YES</button>
                <button onClick={() => cancelItem()}>No</button>
            </div>
        );
    if (type === 'detail') {
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
                <button onClick={() => setDetailModal(false)}> Go Back?</button>
                <button
                    className="deleteItemButton"
                    onClick={() => {
                        setCurrentItem(item);
                        setDeleteModal(true);
                    }}
                >
                &#128465;
                </button>
            </div>
        )
        if (type === 'Success')
         output = (
            <div className="SuccessModal">
                  <div className="item-result-success">
                    <p>Item Added!</p>
                    <span role="img" aria-label="rasing hands">🙌</span>
                 </div>
                  <div className="item-result-error">
                    <p>Problem adding item, try again!</p>
                    <span role="img" aria-label="confused face">😕</span>
                  </div>
            </div>
            )
        
    }

    return output;
};

export default Modal;
