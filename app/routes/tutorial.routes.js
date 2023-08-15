module.exports = app => {
    const users = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    //create new user
    router.post("/", users.create);

    //retrieve all users
    router.get("/", users.findAll);

    //retrieve all with userdob
    router.get("/userDOB", user.findAllUserDOB);

    //retrieve single user with id
    router.get("/:userID", users.findOne);

    // update user with id
    router.put("/:userID", users.update);

    //delete user with id
    router.delete("/:userID", users.delete);

    //delete all
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};