import React from 'react';
import {returnString} from '../lib/timeframeConstants';
import {Modal, Button, Checkbox} from 'react-materialize'
import moment from 'moment';

const ShoppingListItem = ({item, handleCheck, currentItem, setCurrentItem, setDeleteModal, setDetailModal, deleteItem, detailModal}) => {
    const ariaString = `${item.itemName} to be bought in ${returnString("value",item.timeFrame)}`;
    return (
        <React.Fragment>
        <tr className={returnString("class",item.timeFrame)}>
            <td>
            <Checkbox
                onClick={e => handleCheck(e, item)}
                aria-label= {ariaString}
                key={item.id}
                id={item.id}
                name={item.id}
                value={item.isChecked}
                checked={item.isChecked}
            />
            </td>
            <td onClick= {()=> {setCurrentItem(item); setDetailModal(true);setDeleteModal(false)}}  currentItem={item} style={{cursor: "pointer"}} className="modal-trigger" href="#modal2">{item.itemName}</td>
            <td>{returnString("value",item.timeFrame)}</td>
            <td>
            <button
                className="deleteItemButton modal-trigger"
                href="#modal1"
                node="button"
                onClick={() => {
                    setCurrentItem(item);
                    setDeleteModal(true);
                    setDetailModal(false)
                }}
            >
            <img src="/img/005-trash.png" alt="delete icon" />
            </button></td>
        </tr>

            <Modal header="Here are the details of your item:" id="modal2"
            actions={[
                <div>
                <Button flat modal="close" node="button" waves="green">Close</Button>
                </div>
                ]}>
                <div className="detailsModal">

                <h2>{currentItem.itemName}</h2>
                {/* <h1>Purchase Details</h1> */}
                <ul>
                    <li>
                        Last purchase:{' '}
                        <p>
                            {' '}
                            {currentItem.lastPurchaseDate
                                ? moment(currentItem.lastPurchaseDate).format('LL')
                                : 'None'}
                        </p>
                    </li>
                    <li>
                        Next purchase:{' '}
                        {
                            <p>
                                {currentItem.nextPurchaseDate
                                    ?  moment(currentItem.nextPurchaseDate).format("LL")
                                    : 'None'}
                            </p>
                        }
                    </li>
                    <li>
                        Number of purchases:
                        <p id="itemDetails">{currentItem.numOfPurchases}</p>
                    </li>
                </ul>
            </div>
            
            </Modal>
            <Modal header="Want to delete your item?" id="modal1"
                actions={[
                <div>
                <Button flat modal="close" node="button" waves="green" onClick={() => deleteItem(currentItem)}>Yes</Button>
                <Button flat modal="close" node="button" waves="green">No</Button>
                </div>
                ]}>
                    By removing the item from your list, you will no longer need to worry about buying it :)
            </Modal>
            </React.Fragment>
    );
    }

    export default ShoppingListItem;