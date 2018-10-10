let express = require('express');
let router = express.Router();
let db = require('./../models');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/register', function(req, res) {
 
    res.render('pages/register', {
        title: 'Sign Up',
        pageID: 'register'
    });
    
});

router.post('/register',function(req,res){

    // let username = req.body.username;
    console.log('username');
   
    // res.send(req.body.username);
    
    // hashing the password
    let password = bcrypt.hashSync(req.body.password,8);

    db.users.create({fname: req.body.fname, lname: req.body.lname, email: req.body.email, username: req.body.username, password: password})
    .then(() => {
        // success;
        res.redirect('/login');
    })
    .catch(error => {
        // error;
        error.log('Could not create account.');
    });
  
    //save to database
    
});

module.exports = router;