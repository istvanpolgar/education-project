const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require('firebase');
const randtoken = require('rand-token');
const Joi = require('./node_modules/joi');
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

const admin = firebase.auth();
const database = firebase.database();

const Schema = Joi.object({
  fname: Joi.string().min(3).max(128).required(),
  lname: Joi.string().min(3).max(128).required(),
  email: Joi.string().email().min(8).max(256).required(),
  password: Joi.string().min(3).max(128).required(),
  conf_password: Joi.string().valid(Joi.ref('password')).required(),
  teacher: Joi.boolean()
})

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

    await admin.signInWithEmailAndPassword(email, password)
    .then(() => {
      const token = randtoken.generate(16);
      res.send({
        "token": token
      });
    })
    .catch((error) => {
      res.send(error);
    });
  } catch (e) {
    res.json({code: 400, message: "Both fields are required!"});
  }
});

app.post('/regist', async (req, res) => {
  try{
    const {
      fname,
      lname,
      email,
      password,
      conf_password,
      teacher
    } = req.body;

    await Schema.validateAsync(req.body)
    .then( () => {
        admin.createUserWithEmailAndPassword(email, password).
        then( () => {
          database
          .ref('users/' + admin.currentUser.uid)
          .set({
              fname: fname,
              lname: lname,
              email: email,
              password: password,
              teacher: teacher
          }).
          then(() => {
            res.send({'status': 'Registration ok'});
          })
          .catch((error) => {
            res.send(error);
          });
        })
        .catch((error) => {
          res.send(error);
        });
    })
    .catch((error) => {
      res.send({code: 400, message: error.message});

    });
  } catch (e) {
    res.send({code: 400, message: "All fields are required!"});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})