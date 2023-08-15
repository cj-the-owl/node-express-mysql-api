const sql = require("./db");

//constructor
const User = function(user) {
    this.userID = user.userID;
    this.firstname = user.firstname;
    this.userDOB = user.userDOB;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { userID: res.insertId, ...newUser});
        result(null, { userID: res.insertId, ...newUser});
    });
};

User.findById = (userID, result) => {
    sql.query(`SELECT * FROM users WHERE userID = ${userID}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        //not found user with the userid
        result({kind: "not_found"}, null);
    });
};

User.getAll = (firstname, result) => {
    let query = "SELECT * users";

    if(firstname) {
        query += `WHERE firstname LIKE %{firstname}%`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.getAllUserDOB = result => {
    sql.query("SELECT * FROM users WHERE userDOB=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.updateById = (userID, user, result) => {
    sql.query(
        "UPDATE users SET firstname = ?, userDOB = ? WHERE userID = ?",
    [user.firstname, user.userDOB, userID],
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            //not found user with the userid
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated user: ", { userID: userID, ...user});
        result(null, { userID: userID, ...user});
    }
    );
};

User.remove = (userID, result) => {
    sql.query("DELETE FROM users WHERE userID = ?", userID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            //not found user with the userId
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted user with userID: ", userID);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;