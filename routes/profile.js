let express = require('express');
let router = express.Router();
let db = require('./../models');
const LocalStrategy = require('passport-local').Strategy
let passport = require('passport');
const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-Parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//const Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(cookieParser());

var myStore = new SequelizeStore({
    db: db.sequelize
})
router.use(session({
    secret: 'keyboard cat',
    store: myStore,
    resave: false,
    proxy: true
}))

myStore.sync();

router.use(passport.initialize());
router.use(passport.session());

router.get('/profile',function(req,res){
  
    if(!req.isAuthenticated()) {
        res.redirect('/login');
      return
    }
  
    // res.send("You are authenticated.")

    db.users.findAll({where: {username: req.body.username}})
        .then((results) => {
            var r = results[0];
            console.log(r.id, r.username);
        });

    res.render('pages/profile', {
            title: 'My Account',
            pageID: 'profile', 
            username: 'Bob'
    });
        
})

module.exports = router;