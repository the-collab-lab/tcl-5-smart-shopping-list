import React, { useState } from 'react';
import fb from '../lib/firebase';

export default function FirebaseTesting (props) {

  const [clickLog, setClickLog] = useState([]);
  const db = fb.firestore()

  async function onClick(event){
    event.preventDefault();
    const currentTime = Date.now();

    await db.collection("clicks").add({
      "action": "click",
      "dateTime": currentTime
    })
    .then(() => console.log(currentTime + " successfully written!"))
    .catch(error => console.error("Error writing document: ", error));
  }

  return(
    <div>
      <a onClick={onClick} href='/FirebaseTesting'>Click me!</a>
    </div>
  )
}