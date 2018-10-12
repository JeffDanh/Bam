var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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
        user: req.user

    })
});

app.get('/stopwatch', (req, res, next) => {
    res.render('pages/stopwatch', {
        
    })
});

app.get('/analysis', (req, res, next) => {
    res.render('pages/analysis', {
        
    })
});

app.get('/profile', (req, res, next) => {
    res.render('pages/profile', {

    })
});

app.get('/login', (req, res, next) => {
    res.render('pages/login', {
        user: req.user
    })
});

app.get('/logout', (req, res) => {
    
    req.session.destroy(function(e){
        res.clearCookie('session');
        req.logout();
        res.redirect('/');
    })

});

app.get('/drawingboard', (req, res, next) => {
    res.render('pages/drawingboard', {

    });
});
// Chatroom
var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

// White Board
function onConnection(socket){
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}
  
io.on('connection', onConnection);


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
//         res.render('pages/analysis', renderData)
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
