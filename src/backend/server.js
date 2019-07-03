const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { url } = require("./config/config");
const router = require("./routes/index");
const { Article, User, Comment, Vote } = require("./model/Article");
require("dotenv").config();
const PORT = 3000 || process.env.PORT;

console.log("node env", process.env.NODE_ENV);
console.log("node port", process.env.PORT);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("successfully"))
  .catch(err => console.log(err.message));

async function createUser() {
  try {
    const user = await User.create({
      name: "Nam",
      email: "namnh@bravebits.vn",
      password: "12345"
    });
    console.log("user: ", user);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function createArticle() {
  try {
    const article = await Article.create({
      name: "The first article",
      content: "this is my first test article",
      slug: "the-first-article",
      publishDate: "2019-06-28 08:00:00",
      author: "5d158f5614c2d5ca629018df"
    });
    console.log("article: ", article);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function createComment() {
  try {
    const comment = await Comment.create({
      content: "this article is awesome",
      publishDate: "2019-06-28 08:30:00",
      user: "5d159048a1ae09ca86a0e533",
      article: "5d1593bf746fe1cb54fa578b"
    });
    console.log("comment: ", comment);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function createVote() {
  try {
    const vote = await Vote.create({
      comment: "5d1595a5467d09cbc0c415f3",
      publishDate: "2019-06-28 08:31:00",
      user: "5d158f5614c2d5ca629018df",
      action: "like"
    });
    console.log("vote: ", vote);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function addCommentToArticle() {
  try {
    const article = await Article.findOne({ _id: "5d1593bf746fe1cb54fa578b" });
    const comment = await Comment.findOne({ _id: "5d1595a5467d09cbc0c415f3" });
    article.comments.push(comment);
    article.save((err, article) => {
      if (err) console.log(err);
      console.log("updated article: ", article);
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

async function loadArticle() {
  try {
    const article = await Article.findOne({ _id: "5d1593bf746fe1cb54fa578b" });
    // this return an article with author embed
    const articleWithAuthor = await Article.findOne({
      _id: "5d1593bf746fe1cb54fa578b"
    }).populate("author");
    //   .exec(function(err, article) {
    //     if (err) return console.log(err.message);
    //     console.log(article.author.name);
    //   });
    console.log(
      "this return an article with author embed: ",
      articleWithAuthor.author.name
    );
  } catch (ex) {
    console.log(ex.message);
  }
}

async function loadArticleWithComment() {
  try {
    const articleWithAuthAndCommment = await Article.findOne({
      _id: "5d1593bf746fe1cb54fa578b"
    })
      .populate("author")
      .populate("comments");

    console.log("author of article ", articleWithAuthAndCommment.author.name);

    articleWithAuthAndCommment.comments.map(comment =>
      console.log(comment.content)
    );
  } catch (ex) {
    console.log(ex.message);
  }
}

async function loadCommentOfArticle() {
  try {
    const comment = Comment.find({ article: "5d1593bf746fe1cb54fa578b" }).exec(
      (err, comment) => {
        if (err) consolg.log(err);
        comment.map((comment, index) => {
          console.log(
            `The ${index} comment of article 5d1593bf746fe1cb54fa578b is`,
            comment.content
          );
        });
      }
    );
  } catch (ex) {
    console.log(ex.message);
  }
}

async function addArticleToUser() {
  try {
    const user = await User.findOne({ _id: "5d158f5614c2d5ca629018df" });
    const article = await Article.findOne({ _id: "5d1593bf746fe1cb54fa578b" });
    user.articles.push(article);
    user.save((err, user) => {
      if (err) console.log(err);
      console.log("updated user: ", user);
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

async function deleteAllArticlesOfUser() {
  try {
    const user = await User.findOne({ _id: "5d158f5614c2d5ca629018df" });
    const article = await Article.findOne({ _id: "5d1593bf746fe1cb54fa578b" });
    user.articles.length = 0;
    user.save((err, user) => {
      if (err) console.log(err);
      console.log("updated user: ", user);
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

app.listen(3000, console.log(`listening on port ${PORT}`));
