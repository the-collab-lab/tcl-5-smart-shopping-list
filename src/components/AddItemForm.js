import React, {useState, useEffect} from 'react';
import fb from '../lib/firebase';
import '../css/AddItemForm.css';

const Form = () => {

    const [itemName, setName] = useState("");
    const [timeFrame, setTimeFrame] = useState(0);
    const [lastPurchasDate, setDate] = useState(null);
    // const userToken = token || "testToken"

    const handleSubmit = e => {
        e.preventDefault();
        let db = fb.firestore();
        let data = {
            itemName,
            timeFrame:parseInt(timeFrame),
            lastPurchasDate
        };
        console.log(data);
        db.collection("testToken").add(data);
    }

  return (
	<div>

    <form onSubmit={e => handleSubmit(e)}>

        <div><h1>Name of the item</h1></div>
        <input
            name="name"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={e => setName(e.target.value)}/>

        <div><h1>How soon are you likely to buy it again?</h1></div>
        <select name="{timeFrame}" onChange={e => setTimeFrame(e.target.value)}>
            <option value={7}>Soon (in the next 7 days)</option>
            <option value={14}>Kind of soon (in the next 14 days)</option>
            <option value={30}>Not soon (in the next 30 days)</option>
        </select>

        <div><h1>Last purchase date?</h1></div>
        <input
            type="date"
            name="last purchase date"
            placeholder="Last Purchase Date"
            value={lastPurchasDate}
            onChange={e => setDate(e.target.value)}
        />

      <input type="submit"/>
    </form>
	</div>
  )
};

export default Form;