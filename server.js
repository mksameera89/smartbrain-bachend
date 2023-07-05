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
                        connectionString : 'postgres://smartbraindb_gokn_user:NbLEsavMy6zPhpTTMeM8awQMYKPN1LKa@dpg-ciijidlph6erq6h28ng0-a/smartbraindb_gokn',
                        ssl: {rejectUnauthorized: false},
                        host : 'dpg-cidek8tph6eounfdk970-a.oregon-postgres.render.com',
                        port : 5432,
                        user : 'root',
                        password : 'HvgzOlpChQ7SX7wVf8UnI28c3XYnxArf',
                        database : 'smartbraindb_o8vf'
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

app.listen(5432, () => {console.log('server is working on port 3000')})