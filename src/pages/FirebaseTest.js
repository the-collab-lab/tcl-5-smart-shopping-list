import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fb from '../lib/firebase';
import firebase from 'firebase/app';

const FirebaseTesting = () => {
    const [clickLog, setClickLog] = useState([]);
    const db = fb.firestore();
    const clicksRef = db.collection('clicks');

    const onClick = event => {
        event.preventDefault();
        const currentTime = firebase.firestore.Timestamp.fromDate(new Date());

        db.collection('clicks')
            .add({
                action: 'click',
                dateTime: currentTime,
            })
            .then(() => console.log(currentTime + ' successfully written!'))
            .catch(error => console.error('Error writing document: ', error));
    };

    useEffect(() => {
        clicksRef
            .orderBy('dateTime', 'desc')
            .limit(5)
            .get()
            .then(querySnapshot => {
                let clicksArray = [];
                querySnapshot.forEach(doc => {
                    let documentData = doc.data();
                    clicksArray.push(documentData);
                });
                setClickLog(clicksArray);
            })
            .catch(error => {
                console.log('Error getting document:', error);
            });
    }, [clicksRef]);

    return (
        <div>
            <Link onClick={onClick} href="/FirebaseTesting">
                Click me!
            </Link>
            {clickLog ? (
                clickLog.map((log, id) => (
                    <h2 key={id}>
                        {' '}
                        The button was clicked at{' '}
                        {log.dateTime.toDate().toString()}{' '}
                    </h2>
                ))
            ) : (
                <h2>No Clicks</h2>
            )}
        </div>
    );
};

export default FirebaseTesting;
