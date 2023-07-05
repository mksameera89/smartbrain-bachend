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
                        connectionString : 'postgres://smartbraindb_qxbz_user:rbruRBE4yCOKnC23vW4M6Nd4oXymRX1h@dpg-ciilt7lph6erq6js21e0-a/smartbraindb_qxbz',
                        ssl: {rejectUnauthorized: false},
                        host : 'dpg-ciilt7lph6erq6js21e0-a.oregon-postgres.render.com',
                        port : 5432,
                        user : 'smartbraindb_qxbz_user',
                        password : 'rbruRBE4yCOKnC23vW4M6Nd4oXymRX1h',
                        database : 'smartbraindb_qxbz'
                    }
                });
  
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('It is working')})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
    
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {image.hadleApiCall(req, res)})

app.listen(5432, () => {console.log('server is working on port 5432')})