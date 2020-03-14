import React, { useState } from 'react';
import fb from '../lib/firebase';

export default function FirebaseTesting (props) {

  const [clickLog, setClickLog] = useState([]);
  const db = fb.firestore()
  const clicksRef = db.collection("clicks");
  
  async function onClick(event){
    event.preventDefault();
    const currentTime = Date.now();

    await db.collection("clicks").add({
      "action": "click",
      "dateTime": currentTime
    })
    .then(() => console.log(currentTime + " successfully written!"))
    .catch(error => console.error("Error writing document: ", error));

    await clicksRef
      .limit(3)
      .get()
      .then(function (querySnapshot) {
        let clicksArray = [];
        querySnapshot.forEach(function(doc){
          let documentData = doc.data();
          clicksArray.push(documentData);
        });
        setClickLog(clicksArray);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  function renderClickLog() {
    if (clickLog) {
      return clickLog.map((log, id) => <h2 key = {id} > The button was clicked at {log.dateTime} </h2>);

    }
      else {
        return ( <h2> No clicks so far. </h2>);
      }
  }

  return(
    <div>
      <a onClick={onClick} href='/FirebaseTesting'>Click me!</a>
      {renderClickLog()}
    </div>
  );
}
