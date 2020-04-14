import React from 'react';
import {Link} from "react-router-dom";
import '../App.css';
import fb from "../lib/firebase";

//const [setModal] = useState(false);
//const [deleteItem, deleteItemMessage] = useState();

const Modal = ({token},item) => {
const userToken = token
const deleteItem = item => { 
    //setModal(true);      
    let db = fb.firestore();
    db.collection(userToken)
           .doc(item.id)
           .delete()
          // .then(() => getShoppingList());
}/*setModal(false)*/


const deleteItemMessage =(
    <Modal>
            <p> Are you sure you want to delete this item {deleteItem}?</p>
            <button onClick={() => deleteItem()}>YES</button>
            <Link to='/ShoppingList'>NO</Link>
            {/*we want ot return to the shopping list we were on, however so need to fix this*/}
    </Modal>
);

    return (
        {deleteItemMessage} 
    )
}

export default Modal;