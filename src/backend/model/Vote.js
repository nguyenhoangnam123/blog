const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const voteSchema = mongoose.Schema(
  {
    author: { type: ObjectId, required: [true, "can't be blank"], ref: "User" },
    comment: {
      type: ObjectId,
      ref: "Comment",
      required: [true, "can't be blank"]
    },
    action: {
      type: String,
      enum: ["like", "love", "dislike"],
      required: [true, "can't be blank"]
    }
  },
  { timestamps: true }
);

voteSchema.methods.toJSONFor = function(user) {
  return {
    id: this._id,
    action: this.action,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

module.exports = {
  Vote: mongoose.model("vote", voteSchema)
};
