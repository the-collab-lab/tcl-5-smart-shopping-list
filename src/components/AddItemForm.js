import React, {useState, useEffect} from 'react';
import fb from '../lib/firebase';
import '../css/AddItemForm.css';

const Form = ({token}) => {
    const [itemName, setItemName] = useState("");
    const [timeFrame, setTimeFrame] = useState(7);
    const [lastPurchaseDate, setPurchaseDate] = useState(null);
    const userToken = token || "userToken";
    const [shoppingListCollection, setShoppingListCollection] = useState([]);
    const [duplicateError, setDuplicateError] = useState(false);

    useEffect(() => {
        const db =  fb.firestore()
        const tokenRef = db.collection(token);

        tokenRef
            .orderBy("timeFrame", "asc")
            .get()
            .then((querySnapshot) => {
                let fullCollection = [];
                let fullObject = [];

                querySnapshot.forEach((doc) => {
                    let documentData = doc.data();
                    fullCollection.push(documentData.itemName);
                    fullObject.push(documentData);
                    console.log (documentData);
                });
                setShoppingListCollection(fullCollection);
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        let db = fb.firestore();
        if (!shoppingListCollection.includes(itemName)) {
            let data = {
                itemName,
                timeFrame: parseInt(timeFrame),
                lastPurchaseDate
            };
            db.collection(userToken).add(data)
            .then((docRef) => {alert(" successfully written!"); console.log(docRef) })
            .catch(error => console.error("Error writing document: ", error));
        } else {
            setDuplicateError(true)
        }
    }



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

        {duplicateError ? <div className="errorMessage">There is a duplicate item in your shopping list.</div> : null }
      <input type="submit"/>
    </form>
	</div>
  )
};

export default Form;