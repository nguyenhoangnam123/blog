require("dotenv").config();
module.exports = {
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "secret",
  url: "mongodb://localhost:27017/blog"
};
