const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create('blog post 1', 'this is the content of the blog post 1', 'John Jiminy');
BlogPosts.create('blog post 2', 'this is the content of the blog post 2', 'Jared Spomona');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


module.exports = router;
