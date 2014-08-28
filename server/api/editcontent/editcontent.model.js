var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    content: String
});

module.exports = mongoose.model('Article', ArticleSchema);