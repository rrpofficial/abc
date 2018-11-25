const mongoose  = require('mongoose');
module.exports = function(){
    mongoose.connect('mongodb://localhost/abc', { useNewUrlParser: true })
    .then(()=> {console.log('Connected to MongoDB')})
    .catch(()=>{ console.log('Connection to database failed')});
}
