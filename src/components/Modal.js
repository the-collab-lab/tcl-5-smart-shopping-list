import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import fb from '../lib/firebase';

//const [setModal] = useState(false);
//const [deleteItem, deleteItemMessage] = useState();

const Modal = (item, props) => {
    return (
        <div className="Modal">
            <p> Are you sure you want to delete this item?</p>
            <button onClick={() => props.deleteItem(props.item.id)}>YES</button>
            <button>No</button>
            {/*we want ot return to the shopping list we were on, however so need to fix this*/}
        </div>
    );
};

export default Modal;
