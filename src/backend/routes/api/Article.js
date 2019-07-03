const router = require("express").Router();
const auth = require("../auth");
const { Article, validateArticle } = require("../../model/Article");
const { User } = require("../../model/User");

router.post("/create", async (req, res) => {
  const article = req.body.article;
  const { error } = validateArticle(article);
  if (error) {
    res.status(400).send(error.message);
  } else {
    try {
      // find User, if not found return unauthorize
      const user = await User.findById(article.author);
      if (!user) {
        res.status(401).json({ message: "unauthorized" });
      }
      //create new article
      const newArticle = await Article.create(article);

      //add article to user's articles
      user.articles.push(newArticle._id);
      const newUser = await user.save();

      res.status(200).json({
        article: newArticle.toJSONFor(user)
      });
    } catch (ex) {
      console.log(ex.message);
    }
  }
});

router.get("/findAll", async (req, res) => {
  try {
    const articles = await Article.find({});
    console.log("articles: ", articles);
    res.status(200).json(articles);
  } catch (ex) {
    console.log(ex.message);
  }
});

router.put("/", async (req, res) => {
  const article = req.body.article;
  const { error } = validateArticle(article);
  if (error) {
    res.status(400).send(error.message);
  } else {
    try {
      const { _id, title, body, author, comments, tagList } = article;
      const user = await User.findById(author);
      const updatedArticle = await Article.findById(_id);

      //   check auth whether none exist user or invalid user
      if (!user || updatedArticle._id !== author) {
        res.status(401).json({ message: "unauthorized" });
      }

      //   check if article is exist or not
      else if (!updatedArticle) {
        res.status(403).json({ message: "no right to access" });
      }

      //update article
      else {
        if (title) {
          updatedArticle.title = title;
        }
        if (body) {
          updatedArticle.body = body;
        }
        if (comments) {
          updatedArticle.comments = comments;
        }
        if (tagList) {
          updatedArticle.tagList = tagList;
        }

        await updatedArticle.save();
        console.log("updated article: ", updatedArticle);
        res.status(200).json({
          article: updatedArticle.toJSONFor(user)
        });
      }
    } catch (ex) {
      console.log(ex.message);
    }
  }
});

router.delete("/", async (req, res) => {
  const article = req.body.article;
  try {
    const { _id, author } = article;
    const user = await User.findById(author);
    console.log("user", user);
    const deletedArticle = await Article.findById(_id);
    console.log("article", deletedArticle);

    //   check auth whether none exist user or invalid user
    if (!user || deletedArticle.author != author) {
      console.log(deletedArticle.author !== author);
      res.status(401).json({ message: "unauthorized" });
    }

    //   check if article is exist or not
    else if (!deletedArticle) {
      res.status(403).json({ message: "no right to access" });
    }

    // delete article
    else {
      await Article.deleteOne({ _id });
      user.articles = user.articles.filter(id => id != _id);
      await user.save();
      res.status(200).send(user);
    }
  } catch (ex) {
    console.log(ex.message);
  }
});

module.exports = router;
