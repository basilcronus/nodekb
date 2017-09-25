const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost/nodekb');
// var db = mongoose.connection;

// db.once('open', () => {
//     console.log('connected to mongodb');
// });

// db.on('error', (err) => {
//     console.log('there was an error: ', err);
// });


const app = express();

var Article = require('./models/article');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let articles = Article.find({}, (err, articles) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {title: 'Articles', articles: articles});
        }        
    });    
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', {title: 'Add Article'})
});

app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        console.log(article);
    });
});


app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
        
    })

    console.log(article.title);
    return;
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});