var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth");

// Get tasks -> /tasks
router.get("/", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.tasks
            .findAll({ where: { userId: user.userId, deleted: false } })
            .then(result => {
              return res.status(200).json(result);
            })
            .catch(err => res.status(500).json(err));
        } else {
          return res.status(401).json({ error: "Oops, invalid authentication token. User could not be found." });
        }
      });
  } else {
    return res.status(401).json({ error: "Oops, you must be signed in to continue." });
  }
});

// Add new task -> /tasks
router.post("/", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.tasks
            .create({ taskTitle: req.body.taskTitle, taskBody: req.body.taskBody, userId: user.userId })
            .then(result => {
              return res.status(200).json(result);
            })
            .catch(err => res.status(500).json(err));
        } else {
          return res.status(401).json({ error: "Oops, invalid authentication token. User could not be found." });
        }
      });
  } else {
    return res.status(401).json({ error: "Oops, you must be signed in to continue." });
  }
});

// Get task with specified id -> /tasks/:id
router.get("/:id", function (req, res, next) {
  let token = req.cookies.jwt;
  console.log("get task with id route");
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.tasks
            .find({ where: { taskId: parseInt(req.params.id), deleted: false } })
            .then(result => {
              console.log(result);
              return res.status(200).json(result);
            })
            .catch(err => res.status(500).json({ error: "An error occured while fetching your task data. Please try again in a few minutes." }));
        } else {
          return res.status(401).json({ error: "Oops, invalid authentication token. User could not be found." });
        }
      });
  } else {
    return res.status(401).json({ error: "Oops, you must be signed in to continue." });
  }
});

// Edit task with specified id -> /tasks/:id
router.put("/:id", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.tasks
            .update(req.body, { where: { taskId: parseInt(req.params.id) } })
            .then(result => {
              console.log(result);
              return res.status(200).json({ message: "Your task was updated successfully.", result: result });
            })
            .catch(err => {
              return res.status(400).json({ error: "An error occured while updating your task. Please try again in a few minutes." });
            });
        } else {
          return res.status(401).json({ error: "Oops, invalid authentication token. User could not be found." });
        }
      });
  } else {
    return res.status(401).json({ error: "Oops, you must be signed in to continue." });
  }
});

// Delete task with specified id -> /tasks/:id
router.delete("/:id", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.tasks
            .update({ deleted: true }, { where: { taskId: parseInt(req.params.id) } })
            .then(result => {
              return res.status(200).json({ message: "Task deleted" });
            })
            .catch(err => {
              return res.status(400).json({ error: "An error occured while deleting the task. Please try again in a few minutes." });
            });
        } else {
          return res.status(401).json({ error: "Oops, invalid authentication token. User could not be found." });
        }
      });
  } else {
    return res.status(401).json({ error: "Oops, you must be signed in to continue." });
  }
});

module.exports = router;