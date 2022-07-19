const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());


const { login, register } = require("./Authentication/authenticate");
const userController = require("./controllers/user.controller");
const taskController = require("./controllers/task.controller");



app.post("/register", register);
app.post("/login", login);
app.use("/users", userController);
app.use("/tasks", taskController);


 


app.listen("5000", () => {
    console.log("listening port 5000")
});