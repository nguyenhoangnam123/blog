const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = mongoose.Schema(
  {
    article: { type: ObjectId, required: true, ref: "Article" },
    content: { type: String, required: [true, "can't be blank"] },
    author: { type: ObjectId, required: true, ref: "User" },
    votes: [{ type: ObjectId, ref: "Vote" }],
    father: { type: ObjectId, ref: "Comment" }
  },
  { timestamps: true }
);

// Requires population of author
commentSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    content: this.content,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

module.exports = {
  Comment: mongoose.model("Comment", commentSchema)
};
