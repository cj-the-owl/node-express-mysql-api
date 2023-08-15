const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requestss of content-type - application/x-ww-form-urlencoded
app.use(express.urlencoded({ extented: true }));

//simple route
app.get("/", (req, res) => {
    res.json({message: "welcome"});
});

require("./app/routes/tutorial.routes.js");

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
    