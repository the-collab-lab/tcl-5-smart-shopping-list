import React from 'react';
import {Button} from 'react-materialize'

const JoinList = ({ handleChange, checkToken, inputToken }) => {
    return (
        <div className="JoinList-container">
        <img src="/img/shopping-bag-1.png"/>
            <div className="JoinList-text">
                Enter the token of an existing shopping list.
            </div>
            <input
                className="JoinList-input"
                type="text"
                name="inputToken"
                placeholder="Enter Token"
                onChange={handleChange}
                required
            />
             <Button
                node="button"
                className="JoinList-button"
                onClick={() => checkToken(inputToken)}
                // style={{
                // marginRight: '15px'
                // }}
                waves="light"
            >
                Join List{' '}
            </Button>
            {/* <button
                className="JoinList-button"
                onClick={() => checkToken(inputToken)}
            >
                Join List{' '}
            </button> */}
        </div>
    );
};
export default JoinList;
