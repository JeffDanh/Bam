var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let db = require('../models');

router.use(bodyParser.urlencoded({ extended: false}))

router.use(bodyParser.json())

router.get('/regimen', (req, res) => {

    res.render('pages/regimen', {
        pageTitle: "Regimen",
        pageId: "Regimen"
    });

})

router.post('/regimen', (req, res) => {
    res.render('pages/regimen');
    
})

module.exports = router;