const express = require('express');
const app = express();
const passport = require('passport');

app.use(express.json());
require('./routes/routes')(app);
require('./init/db')();

app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

app.listen(3000);