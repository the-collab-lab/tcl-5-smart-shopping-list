import React, {useState} from 'react';
import fb from '../lib/firebase';
import '../css/AddItemForm.css';
import { v4 as uuidv4 } from 'uuid';

const Form = ({token}) => {
    const [itemName, setItemName] = useState("");
    const [timeFrame, setTimeFrame] = useState(7);
    const [lastPurchaseDate, setPurchaseDate] = useState(null);
    const userToken = token || "userToken";
    const [shoppingListCollection, setShoppingListCollection] = useState(getCollection());

    const db =  fb.firestore()
    const clicksRef = db.collection("clicks");

    const handleSubmit = e => {
        e.preventDefault();
        let db = fb.firestore();
        let data = {
            id: uuidv4(),
            itemName,
            timeFrame: parseInt(timeFrame),
            lastPurchaseDate
        };
        db.collection(userToken).add(data)
        .then(() => alert(" successfully written!"))
        .catch(error => console.error("Error writing document: ", error));
    }

    const getCollection = () => {
        clicksRef
            .orderBy("timeFrame", "asc")
            .get()
            .then((querySnapshot) => {
                let fullCollection = [];
                querySnapshot.forEach((doc) => {
                    let documentData = doc.data();
                    fullCollection.push(documentData.itemName);
                });
                return fullCollection;
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    };

  return (
	<div>

    <form onSubmit={e => handleSubmit(e)}>

        <div><h1>Name of the item</h1></div>
        <input
            name="item name"
            type="text"
            placeholder="ie: apple"
            value={itemName}
            onChange={e => setItemName(e.target.value)}/>

        <div><h1>How soon are you likely to buy it again?</h1></div>
        <select name="time frame" onChange={e => setTimeFrame(e.target.value)}>
            <option value={7}>Soon (in the next 7 days)</option>
            <option value={14}>Kind of soon (in the next 14 days)</option>
            <option value={30}>Not soon (in the next 30 days)</option>
        </select>

        <div><h1>Last purchase date?</h1></div>
        <input
            type="date"
            name="last purchase date"
            placeholder="Last Purchase Date"
            value={lastPurchaseDate}
            onChange={e => setPurchaseDate(e.target.value)}
        />
      <input type="submit"/>
    </form>
	</div>
  )
};

export default Form;