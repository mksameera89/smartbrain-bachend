const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
                    client: 'pg',
                    connection: {
                    host : '127.0.0.1',
                    port : 5432,
                    user : 'postgres',
                    password : 'root',
                    database : 'smartbrain'
                    }
                });
  
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send()})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
    
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {image.hadleApiCall(req, res)})

app.listen(3000, () => {console.log('server is working on port 3000')})