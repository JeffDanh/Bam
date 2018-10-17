let express = require('express');
let router = express.Router();

router.get('/videoanalysis', (req, res) => {
    res.render('pages/videoanalysis', {
        videoId: ['']
    });

});

// router.post('/searchResult', (req, res) => {
    
// });

module.exports = router;