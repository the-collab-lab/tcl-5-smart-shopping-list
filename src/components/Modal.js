import React from 'react';
import '../App.css';

const Modal = props => {
 let output;

   if ( props.type === "deleteItem" ){
     output =  (
     <div className="Modal">
     <p> Are you sure you want to delete {props.item.itemName}?</p>
     <button onClick={() => props.delete(props.item)}>YES</button>
     <button onClick={() => props.cancel()}>No</button>
     </div>
    );

   }
   else if ( props.type === "detail"){

    output = (
     <div className ="detailsModal"> 
      <h1>Purchase Details</h1>
      <h2>{props.item.name}</h2>
     <ul>
       <li>
        Last purchase:{' '}
        {/* <p> {isNewItem ? 'None' : props.item.lastPurchaseDate}</p> */}
      </li>
      <li>
        Next purchase:{' '}
      {/* {<p>{isNewItem ? 'None' : props.item.nextPurchaseDate}</p>} */}
      </li>
      <li>
        Number of purchases:
        <p id="itemDetails">{props.item.numberOfPurchases}</p>
      </li>
    </ul>
    {/* <button onClick={}>Close</button> */}
    </div>
    );
   }

  return output;
};

export default Modal;
