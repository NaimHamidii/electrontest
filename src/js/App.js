import React from 'react';

export default function App() {
    const title = "Hello world";
    const enhacedTitle = title + ' - REACT APP';

    const sendNotificationHandler = () => {
        electron.notificationAPI.sendNotification('Notification test!');
    }

    const restartApp = () => {
        electron.restartAfterUpdate.restartApp();
    }

    return(
        <>
            <button onClick={sendNotificationHandler}>Send notification</button>
            <button onClick={restartApp}>Restart app</button>
        </>
    )
}