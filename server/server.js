const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require("firebase");
require("firebase/database");

const port = 8080;

const firebaseConfig = {
  apiKey: "AIzaSyCbJWg2LmOei0K25Ro3-EEwnk53Tbe8N00",
  authDomain: "educationproject-7c807.firebaseapp.com",
  databaseURL: "https://educationproject-7c807-default-rtdb.firebaseio.com",
  projectId: "educationproject-7c807",
  storageBucket: "educationproject-7c807.appspot.com",
  messagingSenderId: "171145889551",
  appId: "1:171145889551:web:09ac8165bc513f220fe07a",
  measurementId: "G-M0MMQR8SBV"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.app().database();

let state;

database.ref('users').set({
  "0": {
    "role": "teacher",
    "name": "Polgár István",
    "email": "istvanpolgar@yahoo.com",
    "birth_day": {
      "year": "1993",
      "mounth": "ianuary",
      "day": "16"
    },
    "user_name": "Polgi",
    "password": "123456"
  },
  "1": {
    "role": "student",
    "name": "Polgár István",
    "email": "istvanpolgar@yahoo.com",
    "birth_day": {
      "year": "1993",
      "mounth": "ianuary",
      "day": "16"
    },
    "user_name": "Polgi2",
    "password": "12345678"
  }
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
  database
    .ref('users/')
    .once('value' , (snap) => {
      if(snap.){
        res.send({
          token: 'test123'
        });
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})