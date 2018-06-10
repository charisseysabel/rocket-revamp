var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    name: String,
    category: String,
    account: String,
    amount: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
