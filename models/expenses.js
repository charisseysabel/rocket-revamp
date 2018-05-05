var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    name: String,
    category: String,
    account: String,
    amount: Number,
});

module.exports = mongoose.model('Expense', ExpenseSchema);
