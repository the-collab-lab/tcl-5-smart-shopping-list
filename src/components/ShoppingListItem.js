import React from 'react';

const timeFrameString = number =>
{
    switch(number){
        case 7:
            return "Fewer than 7 days";
        case 14:
            return "7 to 30 days";
        case 30:
            return "More than 30 days";
        default:
            return "None";
    }
        
}

const ShoppingListItem = ({item,handleCheck}) => {
    return (
        <tr>
            <td>
                <input
                key={item.id}
                id={item.id}
                type="checkbox"
                name={item.id}
                value={item.isChecked}
                checked={item.isChecked}
                onChange={e => handleCheck(e, item)}
                />
            </td>
            <td>{item.itemName}</td>
            <td>{timeFrameString(item.timeFrame)}</td>
        </tr>
    );
    }

    export default ShoppingListItem;