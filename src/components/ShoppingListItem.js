import React from 'react';

const ShoppingListItem = ({item,handleCheck}) => {
    return (
        <React.Fragment>
            <input
                key={item.id}
                id={item.id}
                type="checkbox"
                name={item.id}
                value={item.isChecked}
                checked={item.isChecked}
                onChange={e => handleCheck(e, item)}
            />
            {item.itemName}
        </React.Fragment>
    );
    }

    export default ShoppingListItem;