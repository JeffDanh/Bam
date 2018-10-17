var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let db = require('../models');

router.use(bodyParser.urlencoded({ extended: false}))

router.use(bodyParser.json())

router.get('/regimen', (req, res) => {
    db.regimen.findAll({
        where:{
            category: req.body.category
        }
    })
    .then(function(result){
        console.log(result);
        res.render('pages/regimen', {
            result: result
        });
    })

    res.render('pages/regimen', {
        pageTitle: "Regimen",
        pageId: "Regimen"
    });

    

})

router.post('/regimen', (req, res) => {
    res.render('pages/regimen');
    db.regimen.create({category: req.body.category, session_length: req.body.session_length, schedule: req.body.schedule, organization: req.body.organization, description: req.body.description, note: req.body.note, privacy: req.body.privacy})
    .then(() => {
        console.log()
        res.redirect('/regimen');
    })
    .catch(error => {
        console.log(error);
    })

})

module.exports = router;