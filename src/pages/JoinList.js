import React from 'react';
import {Button} from 'react-materialize'

const JoinList = ({ handleChange, checkToken, inputToken }) => {
    return (
        <div className="JoinList-container">
        <img src="/img/shopping-bag-1.png"/>
            <div className="JoinList-text">
                Enter the token of an existing shopping list.
            </div>
            <div className='row'>
                <div className='input-field col s12'>
                <input
                className="JoinList-input"
                type="text"
                name="inputToken"
                placeholder="Enter Token"
                onChange={handleChange}
                required
            />
                </div>
            </div>
             <Button
                node="button"
                className='btn-large'
                onClick={() => checkToken(inputToken)}
                waves="light"
            >
                Join List{' '}
            </Button>
        </div>
    );
};
export default JoinList;
