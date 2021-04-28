const express = require('express');
const cors = require('cors');
const app = express();
const firebase = require('firebase');
const Joi = require('./node_modules/joi');
const jwt = require('jsonwebtoken');

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
const refreshTokenSecret = 'thisisatokensecret';
let refreshTokens = [];

const Schema = Joi.object({
  fname: Joi.string().min(3).max(128).required(),
  lname: Joi.string().min(3).max(128).required(),
  email: Joi.string().email().min(8).max(256).required(),
  password: Joi.string().min(3).max(128).required(),
  conf_password: Joi.string().valid(Joi.ref('password')).required(),
  teacher: Joi.boolean()
})

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.json({code: 403, message: "Token is wrong in JWT!"});
        }
        req.user = user;
        next();
      });
  } else {
    res.json({code: 403, message: "Token is missing in JWT!"});
  }
};

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

app.post('/page', authenticateJWT, async (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.json({code: 401, message: "Token is missing in /token!"});;
  }

  if (!refreshTokens.includes(token)) {
      return res.json({code: 403, message: "Token is wrong in /token 1!"});
  }

  await jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
          return res.json({code: 403, message: "Token is wrong in /token 2!"});
      }
      res.json({
          "token": token
      });
  });
});

app.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;

    await admin.signInWithEmailAndPassword(email, password)
    .then( async () => {
      const accessToken = jwt.sign({ 
          email: email,  
          password: password
        }, 
        refreshTokenSecret,
        { expiresIn: '60s' }
      );

      refreshTokens.push(accessToken);
      
      res.send({
        "token": accessToken
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

app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token)

  res.json({code: 100, message: "Logged out!"});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})