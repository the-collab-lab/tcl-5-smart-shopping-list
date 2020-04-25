import React from 'react';

const JoinList = ({ handleChange, checkToken, inputToken }) => {
    return (
        <div className="JoinList-container">
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
            <button
                className="JoinList-button"
                onClick={() => checkToken(inputToken)}
            >
                Join List{' '}
            </button>
        </div>
    );
};
export default JoinList;
