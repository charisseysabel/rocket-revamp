var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BudgetSchema = new Schema(
    {
        name: String,
        amount: Number,
    },
    { collection: 'budget' }
);

module.exports = mongoose.model('Budget', BudgetSchema);
