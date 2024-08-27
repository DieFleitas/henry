// const bodyParser = require("body-parser");
const express = require("express");

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
var id = 1;
const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
//server.use("/posts", postsRouter)

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el post",
    });
  } else {
    let postObject = {
      author,
      title,
      contents,
      id,
    };

    id++;
    posts.push(postObject);
    res.status(200).json(postObject);
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;

  if (!title || !contents || !author) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
});

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    let newArr = posts.filter(
      (post) => post.title.includes(term) || post.contents.includes(term)
    );
    res.status(200).json(newArr);
  } else {
    res.status(200).json(posts);
  }
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  let newArray = posts.filter((post) => post.author === author);
  if (newArray.length) res.status(200).json(newArray);
  else
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post del autor indicado",
    });
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  let newArray = posts.filter(
    (post) => post.author === author && post.title === title
  );
  if (newArray.length) res.status(200).json(newArray);
  else
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }

  let postFound = posts.find((post) => post.id === id);
  if (postFound) {
    postFound.title = title;
    postFound.contents = contents;
    res.status(200).json(postFound);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "Informa que el `id` indicado no corresponde con un Post existente",
    });
  }
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({
      error: "Mensaje de error",
    });
  }

  let postFound = posts.find((post) => post.id === id);
  if (!postFound) {
    return res.status(STATUS_USER_ERROR).json({
      error: "Mensaje de error",
    });
  } else {
    posts.forEach((post, index) => {
      if (post.id === id) {
        posts.splice(index, 1);
      }
    });
    return res.status(200).json({ success: true });
  }
});

server.delete("/author", (req, res) => {
  const { author } = req.body;

  if (!author) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado",
    });
  }

  let postFound = posts.find((post) => post.author === author);

  if (!postFound) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado",
    });
  } else {
    let postArray = posts.filter(post => post.author === author)
    posts.forEach((post, index) => {
        if(post.author === author){
            posts.splice(index, 1)
        }
    })
    res.status(200).json(postArray)
  }
});

module.exports = { posts, server };
