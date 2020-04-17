import React from 'react';
import '../App.css';

const Modal = props => {
    return (
        <div className="Modal">
            <p> Are you sure you want to delete {props.item.itemName}?</p>
            <button onClick={() => props.delete(props.item)}>YES</button>
            <button onClick={() => props.cancel()}>No</button>
        </div>
    );
};

export default Modal;
