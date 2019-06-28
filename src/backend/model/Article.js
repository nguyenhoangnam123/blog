const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// UserSchema.path('email').validate(function (email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email.text); // Assuming email has a text attribute
//  }, 'The e-mail field cannot be empty.')

const articleSchema = mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true },
  publishDate: { type: String, required: true },
  author: { type: ObjectId, required: true, ref: "User" },
  comments: [{ type: ObjectId, ref: "Comment" }]
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: ObjectId, ref: "Article", unique: true }],
  comments: [{ type: ObjectId, ref: "Comment", unique: true }],
  votes: [{ type: ObjectId, ref: "Vote", unique: true }]
});

const commentSchema = mongoose.Schema({
  article: { type: ObjectId, required: true, ref: "Article" },
  content: { type: String, required: true },
  user: { type: ObjectId, required: true, ref: "User" },
  publishDate: { type: String, required: true },
  votes: [{ type: ObjectId, ref: "Vote" }],
  father: { type: ObjectId, ref: "Comment" }
});

const voteSchema = mongoose.Schema({
  user: { type: ObjectId, required: true, ref: "User" },
  comment: { type: ObjectId, ref: "Comment", required: true },
  action: { type: String, enum: ["like", "love", "dislike"], required: true },
  publishDate: { type: String, required: true }
});

module.exports = {
  Article: mongoose.model("Article", articleSchema),
  User: mongoose.model("User", userSchema),
  Comment: mongoose.model("Comment", commentSchema),
  Vote: mongoose.model("Vote", voteSchema)
};
