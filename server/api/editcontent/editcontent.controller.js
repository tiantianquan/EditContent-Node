var Article = require('./editcontent.model');

exports.getEditContent = function(req, res) {
    Article.find(function(err, articles) {
        res.json(articles[0]);
    });
};

exports.postEditContent = function(req, res) {
    if (req.body._id != undefined) {
        var article = {
            _id: req.body._id,
            content: req.body.content
        };
        Article.findByIdAndUpdate(article._id, {content: article.content }, function(err, doc) {
            console.log(err);
            console.log(doc);
        });
    } else {
        var article = new Article(req.body);
        article.save(function(err) {
            if (!err) {
                res.json(article);
            }
        });
    }
};