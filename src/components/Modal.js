import React from 'react';
import '../App.css';
import searchGiphy from '../lib/giphy.js';

const Modal = ({ type, item, deleteItem, cancelItem, setDetailModal }) => {
    let output;

    if (type === 'deleteItem') {
        console.log("DELETE");
        
        output = (
            
            <section>
            {/* <div className="Modal">
                <p> Are you sure you want to delete {item.itemName}?</p>
                <a href="#" className="btn-close" aria-hidden="true">×</a>
                <button onClick={() => deleteItem(item)}>Yes</button>
                <button onClick={() => cancelItem()}>No</button>
            </div>
            <div className="overlay" aria-hidden="true"></div> */}
            searchGiphy({item.itemName})

            <div className="modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <header>
                        {/* <a href="/ShoppingList" className="closebtn">×</a> */}
                        <h2>Are you sure you want to delete {item.itemName} 😢</h2>
                        <div className="videos"></div>
                    </header>
                    <footer>
                        <button onClick={() => deleteItem(item)}>Yes</button>
                        <button onClick={() => cancelItem()}>No</button>
                    </footer>
                    </div>
                </div>
            </div>
            </section>
            
            // <div className="Modal" aria-hidden="true">
            //     <div className="modal-dialog">
            //         <div className="modal-header">
            //         <h2>Are you sure you want to delete {item.itemName}?</h2>
            //         <a href="#" className="btn-close" aria-hidden="true">×</a>
            //         </div>
            //         <div className="modal-body">
            //             <p>Click yes, and this item will be removed from your shopping list. Click no to cancel.</p>
            //         </div>
            //         <div className="modal-footer">
            //             <button onClick={() => deleteItem(item)}>Yes</button>
            //             <button onClick={() => cancelItem()}>No</button>
            //         </div>
            //     </div>
            // </div>
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
