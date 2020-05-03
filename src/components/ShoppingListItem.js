import React from 'react';
import {returnString} from '../lib/timeframeConstants';

const ShoppingListItem = ({item, handleCheck, setCurrentItem, setDeleteModal, setDetailModal}) => {
    const ariaString = `${item.itemName} to be bought in ${returnString("value",item.timeFrame)}`;
    return (
        
        <tr className={returnString("class",item.timeFrame)}>
            <td>
                <input
                aria-label= {ariaString}
                key={item.id}
                id={item.id}
                type="checkbox"
                name={item.id}
                value={item.isChecked}
                checked={item.isChecked}
                onChange={e => handleCheck(e, item)}
                />
                <span class="checkmark"></span>
            </td>
            <td onClick= {()=> {setCurrentItem(item); setDetailModal(true);setDeleteModal(false)}} style={{cursor: "pointer"}}>{item.itemName}</td>
            <td>{returnString("value",item.timeFrame)}</td>
            <td><button
                    className="deleteItemButton"
                    onClick={() => {
                        setCurrentItem(item);
                        setDeleteModal(true);
                        setDetailModal(false)
                    }}
                >
                <img src="/img/x.png" alt="delete icon" />
                </button></td>
        </tr>
    );
    }

    export default ShoppingListItem;