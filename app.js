const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');

app.use(express.json());
var corsOptions = {
    origin: '*',
    "methods": "GET,HEAD,PUT,POST",
    // "preflightContinue": false,
    allowedHeaders :['Content-Type', 'Authorization', 'x-auth-token','ETag'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  
app.use(cors(corsOptions));

require('./routes/routes')(app);
require('./init/db')();


// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//     // // Request methods you wish to allow
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

app.listen(3000);