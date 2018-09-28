const customers = require('./customers.route');
const materials = require('./materials.route');
const orders = require('./orders.route');
const payables = require('./payables.route');
const products = require('./products.route');
const recievables = require('./recievables.route');
const users = require('./users.route');
const vendors = require('./vendors.route');
const auth = require('./auth.route');

module.exports = function(app){
    app.use('/api/auth', auth);
    app.use('/api/customers', customers);
    app.use('/api/materials', materials);
    app.use('/api/orders', orders);
    app.use('/api/payables', payables);
    app.use('/api/products', products);    
    app.use('/api/recievables', recievables);
    app.use('/api/users', users);
    app.use('/api/vendors', vendors);
    // app.use('/api/users', users);
    // app.use('/api/users', users);
   
    app.get('/', (req, res) =>{
        res.send('HOME');
    } );

}