let express = require('express');
let router = express.Router();
let axios = require('axios');

router.get('/analysis', (req, res) => {
    res.render('pages/analysis', {
        pageTitle: "Analysis",
        pageId: "Analysis"
    });

});

// router.post('/searchResult', (req, res) => {
    
// });

module.exports = router;