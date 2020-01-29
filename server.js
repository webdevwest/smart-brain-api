const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'juliaholland',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			password: 'cookies',
// 			email: 'john@gmail.com',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Sally',
// 			password: 'bananas',
// 			email: 'sally@gmail.com',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 		id: '987',
// 		hash: '',
// 		email: 'john@gmail.com'
// 		}
// 	]
// }

app.get('/', (req, res) => {res.send(database.users)})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port ${process.env.PORT');
})

//************PLANNING OUT API********************//
/* 
/ You want to have a root route...
/ --> res = this is working
/ signin --> POST success or fail
/ register --> POST = user
/ profile --> profile/:userId --> GET = user
/ we want the user's rank/score to increase with the number of photos they submit...
/ image --> PUT --> user
*/