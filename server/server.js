const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require('firebase');
const randtoken = require('rand-token');
require('firebase-admin');

const port = 8080;

firebase.initializeApp({
  apiKey: "AIzaSyCbJWg2LmOei0K25Ro3-EEwnk53Tbe8N00",
  authDomain: "educationproject-7c807.firebaseapp.com",
  databaseURL: "https://educationproject-7c807-default-rtdb.firebaseio.com",
  projectId: "educationproject-7c807",
  storageBucket: "educationproject-7c807.appspot.com",
  messagingSenderId: "171145889551",
  appId: "1:171145889551:web:09ac8165bc513f220fe07a",
  measurementId: "G-M0MMQR8SBV"
});

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.post('/login', async (req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const token = randtoken.generate(16);
      res.send({
        "token": token
      });
    })
    .catch((error) => {
      res.send(error);
    });
  } catch (e) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})