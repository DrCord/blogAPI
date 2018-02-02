const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create('blog post 1', 'this is the content of the blog post 1', 'John Jiminy');
BlogPosts.create('blog post 2', 'this is the content of the blog post 2', 'Jared Spomona');

// read
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

// create
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!req.body || !(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate ? req.body.publishDate : null);
  res.status(201).json(item);
});

// update
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Blog posts item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate ? req.body.publishDate : null
  });
  res.status(204).end();
});

// delete
router.delete('/:id', jsonParser, (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog posts item \`${req.params.id}\``);
  res.status(204).end();
});


module.exports = router;
