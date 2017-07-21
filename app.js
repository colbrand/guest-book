var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var parser = require('body-parser');
var config = require('./config');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(parser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

app.post("/new-entry", (req, res) => {
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and a body!");
        return;
    }

    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    });

    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(config.port, () => console.log(`Guestbook app started on ${config.port}`));