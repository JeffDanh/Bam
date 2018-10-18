var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
let db = require('../models');

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())

// router.get('/regimen', (req, res) => {
    
//     if(!req.isAuthenticated()) {
//         res.redirect('/login');
//         return
//     }

//     var regimenArray = [];

//     // db.regimen.findAll({
//     //     where:{
//     //         category: req.body.category
//     //     }
//     // })
//     // .then(function(result){
//     //     console.log(result);
//     //     res.render('pages/regimen', {
//     //         result: result
//     //     });
//     // })

//     // db.regimen.findAll({
//     //     attributes: ['category', 'session_length', 'schedule', 'organization', 'description', 'note'],
//     //     where:{
//     //         userId: req.user.id
//     //     }
//     // })
//     // .then((results) => {
//     //     for (let i = 0; i < results.length; i++) {
//     //         regimenArray.push(results[i].dataValues);
//     //     }

//     //     res.render('pages/regimen', {
//     //         regimenArray: regimenArray
//     //     })
//     // })
    
    
//     res.render('pages/regimen', {
//         pageTitle: "Regimen",
//         pageId: "Regimen",
//         category: "",
//         sessionLength: "",
//         schedule: "",
//         organization: "",
//         description: "",
//         note: ""

//     });

    

// })

router.post('/regimen', (req, res) => {
    // res.render('pages/regimen');
    // res.render('pages/regimen', {
    //     regimenArray: regimenArray,
    //     category: "",
    //     sessionLength: "",
    //     schedule: "",
    //     organization: "",
    //     description: "",
    //     note: ""
    // });

    db.regimen.create({userId: req.user.id, category: req.body.category, session_length: req.body.session_length, schedule: req.body.schedule, organization: req.body.organization, description: req.body.description, note: req.body.note, privacy: req.body.privacy})
    .then(() => {
        console.log()
        res.redirect('/regimen');
    })
    .catch(error => {
        console.log(error);
    })

})

module.exports = router;