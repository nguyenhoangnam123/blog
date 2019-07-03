const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const slug = require("slug");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { User } = require("../model/User");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "can't be blank"]
    },
    body: {
      type: String,
      required: [true, "can't be blank"]
    },
    slug: { type: String, required: [true, "can't be blank"] },
    author: { type: ObjectId, required: [true, "can't be blank"], ref: "User" },
    comments: [{ type: ObjectId, ref: "Comment" }],
    tagList: [{ type: String }]
  },
  { timestamps: true }
);

articleSchema.pre("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

articleSchema.methods.slugify = function() {
  this.slug =
    slug(this.title) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

articleSchema.methods.toJSONFor = function(user) {
  return {
    title: this.title,
    body: this.body,
    slug: this.slug,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    author: user.toProfileJSONFor()
  };
};

function validateArticle(value) {
  const schema = Joi.object().keys({
    _id: Joi.objectId(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().required(),
    comments: Joi.array().items(Joi.objectId()),
    tagList: Joi.array().items(Joi.string())
  });
  return Joi.validate(value, schema);
}

module.exports = {
  Article: mongoose.model("Article", articleSchema),
  validateArticle: validateArticle
};
