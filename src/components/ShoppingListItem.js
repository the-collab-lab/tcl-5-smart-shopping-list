import React from 'react';
import * as timeframeConstants from '../lib/timeframeConstants';

const timeFrameString = number =>
{
    switch(number){
        case 7:
            return "Fewer than 7 days";
        case 14:
            return "7 to 30 days";
        case 30:
            return "More than 30 days";
        case 0:
            return "Inactive item";
        default:
            return "None";
    }
}
const generateClass = number =>
{
    switch(number){
        case 7:
            return "soon";
        case 14:
            return "kindasoon";
        case 30:
            return "notsoon";
        case 0:
            return "inactive";
        default:
            return "None";
    }
}
// const getStringValue = (numberValue) => {
//     const dictionary = {};
//     dictionary[timeframeConstants.SOON.numberValue] = SOON.stringValue;

//     if (dictionary.keys.includes(numberValue)){
//         return dictionary[numberValue];
//     }
//     return "error"
// }



const ShoppingListItem = ({item, handleCheck, setCurrentItem, setDeleteModal, setDetailModal}) => {
    const ariaString = `${item.itemName} to be bought in ${timeFrameString(item.timeFrame)}`;
    return (
        <tr className={generateClass(item.timeFrame)}>
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
            </td>
            <td onClick= {()=> {setCurrentItem(item); setDetailModal(true);}} style={{cursor: "pointer"}}>{item.itemName}</td>
            <td>{timeFrameString(item.timeFrame)}</td>
            <td><button
                    className="deleteItemButton"
                    onClick={() => {
                        setCurrentItem(item);
                        setDeleteModal(true);
                    }}
                >
                &#128465;
                </button></td>
        </tr>
    );
    }

    export default ShoppingListItem;