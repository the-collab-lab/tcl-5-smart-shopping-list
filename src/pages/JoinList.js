import React from 'react';

const JoinList = props => {
    return (
        <div>
            <input
                type="text"
                name="inputToken"
                placeholder="Enter Token"
                onChange={props.handleChange}
                required
            />
            <button
                className="Join-List-Button"
                onClick={() => props.checkToken(props.inputToken)}
            >
                Join List{' '}
            </button>
        </div>
    );
};
export default JoinList;
