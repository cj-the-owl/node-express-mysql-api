const User = require("../models/tutorial.model");

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty"
        });
    }

    //create user

    const user = new User({
        userID: req.body.userID,
        firstname: req.body.firstname,
        userDOB: req.body.userDOB
    });

    //save user in db

    User.create(user, (err, data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "some error occurred while creating user"
    });
    else res.send(data);
    });
};

//retrieve all users from database (with condition)
exports.findAll = (req, res) => {
    const firstname = req.query.firstname;

    User.getAll(firstname, (err, data) => {
        if (err)
        res.status(500).send({
            message: 
            err.message || "some error occurred while retrieving users"
    });
    else res.send(data);
    });
};

//find single user with id
exports.findOne = (req, res) => {
    User.findById(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with userID ${req.params.userID}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with userID" + req.params.userID
                });
            }
        } else res.send(data);
    });
};

//find all dob users
exports.findAllUserDOB = (req, res) => {
    User.getAllUserDOB((err, data) => {
        if(err)
        res.status(500).send({
            message: 
            err.message || "some error occurred while retrieving users"
    });
    else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    User.updateById(
      req.params.userID,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with userID ${req.params.userID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with userID " + req.params.userID
            });
          }
        } else res.send(data);
      }
    );
  };

//delete user with specified id in request
exports.delete = (req, res) => {
    User.remove(req.params.userID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not found user with userID ${req.params.userID}`
                });
            } else {
                res.status(500).send({
                    message: "could not delete User with userID" + req.params.userID
                });
            }
        } else res.ssend({ message: `user was deleted`});
    });
};

//delete all users from database
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if(err)
        res.status(500).send({
            message: 
            err.message || "some error occurred while removing all users"
    });
    else res.send({ message: `All Users were deleted successfully!` });
    });
};