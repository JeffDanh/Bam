var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next){
    
    req.session.destroy((err) => {
        if(err) return next(err)

        req.logout();

        // res.sendStatus(200)

        res.redirect('/login');

        // res.render('pages/logout', {
        // title: 'Signed Out',
        // pageID: 'logout'
        // });
    });
});

module.exports = router;