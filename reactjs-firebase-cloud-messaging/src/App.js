import React, { useState, useEffect } from "react";

import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDLbWCTwxnIOMKZy9te1Db-GnC6PrOzgU0",
    authDomain: "push-noti-reactspringboot.firebaseapp.com",
    projectId: "push-noti-reactspringboot",
    storageBucket: "push-noti-reactspringboot.appspot.com",
    messagingSenderId: "97969431174",
    appId: "1:97969431174:web:ff85ea60a1e0054142a707",
    measurementId: "G-F1RF0E6M7R"
  };
  
  const app               = initializeApp(firebaseConfig);
  const messaging         = getMessaging(app);

  const [token, setToken] = useState(null);

  const generateToken = async() => {

    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
      const token = await getToken(messaging,{
          vapidKey:"BK-1AWv_FyDp6eUfNWL-PJAhRECrvkiPd2pKo434RUpy5oO674jBxPgx0wX-01irtu5_WhDS6QfhoTK4Bz4SCzE"
      })
      console.log(token);
      setToken(token);
      sendTokenToServer(token);
    }


  }

  const sendTokenToServer = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/NotificationPermission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(token),
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }
        console.log('Token sent to server successfully');
    } catch (error) {
        console.error('Error sending token to server:', error);
    }
  };

  return (

    <div className="App">

      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
      
        <div>
          <button onClick={generateToken}>Activate notification</button>
        </div>
      
      </header>

    </div>

  );

}

export default App;
