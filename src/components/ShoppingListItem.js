import React from 'react';

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
            <td>{item.timeFrame}</td>
        </tr>
    );
    }

    export default ShoppingListItem;