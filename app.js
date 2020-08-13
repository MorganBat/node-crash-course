const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog');

require('dotenv').config()

// express app
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://netninja:${process.env.MONGO_PASSWORD}@nodetuts.m5hut.mongodb.net/node-tuts?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews')

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/single-blog', (req, res) => {
  Blog.findById('5f352de6b7f9ad340683edcb')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

// routes
app.get('/', (req, res) => {
  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  ];
    console.log(process.env.MONGO_PASSWORD)
    res.render('index', { title: 'Home', blogs })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

app.get('/blog/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});