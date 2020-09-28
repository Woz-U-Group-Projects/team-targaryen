var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth");

// Sign up user -> /users/signup
router.post("/signup", function (req, res, next) {
  models.users
    .findOrCreate({
      where: { email: req.body.email },
      defaults: {
        username: req.body.username,
        password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        console.log("User successfully signed up");
        return res.status(200).json({ message: "Yay, you've successfully signed up." });
      }
      else {
        return res.status(400).json({ error: "You are already a Pomo-Do user." });
      }
    })
    .catch(err => res.status(400).json(err));
});

// Sign in user -> /users/signin
router.post("/signin", function (req, res, next) {
  models.users.findOne({
    where: { email: req.body.email, deleted: false }
  })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          error: "Oops, user could not be found. Please check your details and try again."
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.password);
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          console.log("Login successful");
          return res.status(200).json({ message: "Yay, you've successfully signed in." });
        } else {
          console.log('Wrong password');
          return res.status(401).json({
            error: "Oops, login failed. Please check your details and try again."
          });
        }
      }
    })
    .catch(err => res.status(400).json(err))
});

// // Sign out user -> /users/signout
// router.get('/signout', function (req, res, next) {
//   res.cookie('jwt', "", { expires: new Date(0) });
//   return res.status(200).json({ message: "You've successfully signed out." });
// });

module.exports = router;
