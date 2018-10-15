var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
const promise = require('bluebird');
var axios = require('axios');

app.set('view engine', 'ejs');

app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/profile'));
// app.use(require('./routes/analysis'));
app.use(require('./routes/logout'));
app.use(require('./routes/regimen'));


const initOptions = {
    promiseLib: promise
};

const config = {
    host: 'localhost',
    port: 5432,
    database: 'bam_db',
    user: 'postgres'
};



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.locals.siteTitle = "Bam";

app.get('/', (req, res) => {
    res.render('pages/index', {
        user: req.user

    })
});

app.get('/stopwatch', (req, res) => {
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

app.get('/discussion', (req, res, next) => {
    res.render('pages/discussion', {

    });
});

// app.get('/login', (req, res, next) => {
//     res.render('pages/login', {
//         user: req.user
//     })
// });

// app.get('/logout', (req, res) => {
    
//     req.session.destroy(function(e){
//         res.clearCookie('session');
//         req.logout();
//         res.redirect('/');
//     })

// });



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

app.post('/searchResult', function(req, res){
    var video = req.body.searchResult;
    console.log(video);
    var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBB0wDawlst6BcDYRbzpox6ZqcsidKXWJ0&part=snippet&order=relevance&maxResults=20";
    axios.get(url, {
        params: {
            q: video
        }
    })
    .then(response => {
        var myArrayId = [];
        for(var i = 0; i < 20; i++){
            myArrayId.push(response.data.items[i].id.videoId)

        };
        res.render('pages/analysis', {
            videoId: myArrayId
        })
        console.log(myArrayId);
    })
    .catch(function(error){
        console.log(error);
    })
});



const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
