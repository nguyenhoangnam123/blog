const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const articleSchema = Joi.object().keys({
  name: Joi.string().required(),
  content: Joi.string().required(),
  slug: Joi.string().required(),
  publishDate: Joi.string().required(),
  author: Joi.objectId().required(),
  comments: Joi.array().items(Joi.objectId())
});

const userSchema = Joi.object().keys({
  name: Joi.string().required,
  email: Joi.email().required(),
  password: Joi.string().required(),
  articles: Joi.array().items(Joi.objectId())
});

const commentSchema = Joi.object().keys({
  content: Joi.string().required(),
  article: Joi.objectId().required(),
  user: Joi.objectId().required(),
  publishDate: Joi.string().required(),
  father: Joi.objectId(),
  votes: Joi.objectId()
});

const voteSchema = Joi.object().keys({
  user: Joi.objectId().required(),
  comment: Joi.objectId().required(),
  publishDate: Joi.string().required(),
  action: Joi.array().items(Joi.string())
});

function validate(value, schema) {
  return Joi.validate(value, schema);
}

module.exports = {
  validateArticle: articleSchema,
  validateUser: userSchema,
  validateComment: commentSchema,
  validateVote: voteSchema,
  validate: validate
};
