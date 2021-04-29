const express = require('express');
const app = express();

const cors = require('cors');
const setHeaders = require('./src/configs/setHeader');

const jwt = require('jsonwebtoken');
const registSchema = require('./src/configs/registValidation');
const loginSchema = require('./src/configs/loginValidation');
const authenticateJWT = require('./src/configs/authenticateJWT');

const firebase = require('firebase');
require('firebase-admin');
const firebaseConfig = require('./src/configs/firebaseConfig');
firebase.initializeApp(firebaseConfig);
const admin = firebase.auth();
const database = firebase.database();

const port = 8080;
const refreshTokenSecret = 'thisisatokensecret';
let refreshTokens = [];

app.use(cors());

app.use(setHeaders);

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

    await loginSchema.validateAsync(req.body)
    .then( () => {
      admin.signInWithEmailAndPassword(email, password)
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
    })
    .catch((error) => {
      res.send({code: 400, message: error.message});
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
      teacher
    } = req.body;

    await registSchema.validateAsync(req.body)
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