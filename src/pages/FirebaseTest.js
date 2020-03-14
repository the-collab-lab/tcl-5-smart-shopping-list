import React, { useState, useEffect } from 'react';
import fb from '../lib/firebase';
import firebase from 'firebase/app';

export default function FirebaseTesting (props) {

  const [clickLog, setClickLog] = useState([]);
  const db = fb.firestore()
  const clicksRef = db.collection("clicks");
  
  async function onClick(event){
    event.preventDefault();
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date());

    await db.collection("clicks").add({
      "action": "click",
      "dateTime": currentTime
    })
    .then(() => console.log(currentTime + " successfully written!"))
    .catch(error => console.error("Error writing document: ", error));
  }

  useEffect(() => {
    clicksRef
      .orderBy("dateTime", "desc")
      .limit(5)
      .get()
      .then(function (querySnapshot) {
        let clicksArray = [];
        querySnapshot.forEach(function (doc) {
          let documentData = doc.data();
          clicksArray.push(documentData);
        });
        setClickLog(clicksArray);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  });

  return(
    <div>
      <a onClick={onClick} href='/FirebaseTesting'>Click me!</a>
      {clickLog ? (clickLog.map((log, id) => <h2 key={id}> The button was clicked at {log.dateTime.toDate().toString()} </h2>)):(<h2>No Clicks</h2>)}
    </div>
  );
}
