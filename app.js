const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
});