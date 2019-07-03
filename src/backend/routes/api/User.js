const router = require("express").Router();
const passport = require("../../config/passport");
const { User, validateUser } = require("../../model/User");
const auth = require("../auth");

router.post("/user/login", auth.required, async (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email) {
    res.status(400).json({ email: "cannot be blank" });
  }
  if (!password) {
    res.status(400).json({ password: "cannot be blank" });
  }
  try {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  } catch (ex) {
    console.log(ex.message);
    res.status(500).json({ message: "something wrong" });
  }
});

router.post("/user/create", async (req, res, next) => {
  // console.log("user: ", req.body);
  const { error } = validateUser(req.body.user);
  if (error) {
    res.status(400).send(error.message);
  } else {
    try {
      const { username, email, password } = req.body.user;
      const user = new User();
      user.username = username;
      user.email = email;
      user.setPassword(password);
      await user.save();
      res.status(200).json({ user: user.toAuthJSON() });
    } catch (ex) {
      console.log(ex.message);
      res.status(500).json({ message: "something wrong" });
      next;
    }
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.sendStatus(401);
    } else {
      res.status(200).json({
        user: users
      });
    }
  } catch (ex) {
    console.log(ex.message);
  }
});

module.exports = router;
