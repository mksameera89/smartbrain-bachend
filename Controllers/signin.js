const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
       const isValid = bcrypt.compareSync(password, data[0].hash);
       if(isValid){
        db.select('*').from('users').where('email', '=', data[0].email)
        .then(user => res.json(user[0]))
        .catch( err => res.status(400).json('unable to get user'))
       }else{
        res.json('Incorrect username or password');
       }
    }).catch(err => res.status(400).json('wrong credentiels'))
}

module.exports = {
    handleSignIn: handleSignIn
}