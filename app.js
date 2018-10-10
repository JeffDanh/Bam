var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
const promise = require('bluebird');

app.set('view engine', 'ejs');

app.use(require('./routes/login'));

app.use(require('./routes/register'));
app.use(require('./routes/profile'));
// app.use(require('./routes/logout'));

const initOptions = {
    promiseLib: promise
};

const config = {
    host: 'localhost',
    port: 5432,
    database: 'bam_db',
    user: 'postgres'
};

let axios = require('axios');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(require('./routes/form'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.locals.siteTitle = "Bam";

app.get('/', (req, res, next) => {
    res.render('pages/index', {
        
    })
});

app.get('/teaminfo', (req, res, next) => {
    res.render('pages/teaminfo', {
        
    })
});

app.get('/profile', (req, res, next) => {
    res.render('pages/profile', {

    })
});

app.get('/login', (req, res, next) => {
    res.render('pages/login', {
        
    })
});

app.get('./signup', (req, res, next) => {
    res.render('pages/signup', {

    });
});



// app.post('/searchResult', function(req, res){
//     searchResult = req.body.searchResult
//     var movieinfo = []
//     var result1 = res.results;
//     var movie = req.body.searchResult;
//     newMovie = movie.replace(/\s+/g, '+');
//     let url = 'https://api.themoviedb.org/3/search/movie?api_key=3868e49837f9f140ac33ea1d02e23897&query=' + newMovie
    
//     function render(movie){
//         var name = movie.title
//         var description = movie.overview
//         var poster = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
//         var language = movie.original_language
//         var voteavg = movie.vote_average
//         var backdrop = 'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path
//         var genre = movie.genre_ids[0];
//         // ^ data is the response from the server
//         // populate this with parsed data var renderData = { }
//         var renderData = { name: name, description: description, poster: poster, language: language, voteavg: voteavg, backdrop: backdrop, genre: genre}
//         res.render('pages/movieinfo', renderData)
//     }
    
//     axios.get(url)
//     .then(function(response) {
//         console.log(response.data)
//         if(response && response.data && response.data.results){
//             if (response.data.results[0]){
//                 var theMovie = response.data.results[0]
//                 movieData = theMovie
//                 // function logic 
                
//                 render(response.data.results[0])
//             }
//             // response.data.results[0].title
//         }
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
//     // res.redirect('/movieinfo')
// })

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});