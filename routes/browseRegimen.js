var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let db = require('../models');

router.use(bodyParser.urlencoded({ extended: false}))

router.use(bodyParser.json())

router.get('/regimen', (req, res) => {
    
    if(!req.isAuthenticated()) {
        res.redirect('/login');
        return
    }

    var regimenArray = [];

    // db.regimen.findAll({
    //     where:{
    //         category: req.body.category
    //     }
    // })
    // .then(function(result){
    //     console.log(result);
    //     res.render('pages/regimen', {
    //         result: result
    //     });
    // })

    db.regimen.findAll({
        attributes: ['category', 'session_length', 'schedule', 'organization', 'description', 'note'],
        where:{
            userId: req.user.id
        }
    })
    .then((results) => {
        for (let i = 0; i < results.length; i++) {
            regimenArray.push(results[i].dataValues);
        }

        res.render('pages/regimen', {
            regimenArray: regimenArray,
            category: "",
            sessionLength: "",
            schedule: "",
            organization: "",
            description: "",
            note: ""
        })
    })

})

module.exports = router;