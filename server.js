var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Expense = require('./models/expenses');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'yyaay' });
});

router.get('/test', function(req, res) {
    res.json({ message: 'poop' });
});

router
    .route('/add')
    .get(function(req, res) {
        Expense.find(function(err, expenses) {
            if (err) res.send(err);
            res.json(expenses);
        });
    })
    .post(function(req, res) {
        Expense.findById(req.body['_id'], function(err, expense) {
            if (expense != undefined) {
                const { name, category, account, amount } = req.body;
                expense.update({ name, category, account, amount }, function(err) {
                    if (err) console.log(err);
                    console.log('Successfully updated!');
                });
            } else {
                var expense = new Expense();
                expense.name = req.body.name;
                expense.category = req.body.category;
                expense.account = req.body.account;
                expense.amount = req.body.amount;

                expense.save(function(err) {
                    if (err) res.send(err);
                    res.json({ message: 'Expense added!' });
                });
            }
        });
    })
    .delete(function(req, res) {
        Expense.remove({ _id: req.body['_id'] }, function(err) {
            if (err) res.send(err);
            res.json({ message: 'item has been deleted successfully!' });
        });
    });

app.use('/api', router);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
