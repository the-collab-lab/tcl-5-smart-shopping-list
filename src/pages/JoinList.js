import React from 'react';

const JoinList = ({handleChange, checkToken, inputToken}) => {
    return (
        <div>
            <input
                type="text"
                name="inputToken"
                placeholder="Enter Token"
                onChange={handleChange}
                required
            />
            <button
                className="Join-List-Button"
                onClick={() => checkToken(inputToken)}
            >
                Join List{' '}
            </button>
        </div>
    );
};
export default JoinList;
