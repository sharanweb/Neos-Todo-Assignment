const express = require("express");
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const path = require("path");
const filepath = path.join(__dirname, "../data.json")
const sendMail = require("./mail.controller")


// getting all tasks
router.get("/", async (req, res) => {
    try {

        const data = fs.readFileSync(filepath, 'utf8');
        const { Task } = JSON.parse(data);
        return res.send(Task)

    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        res.send(err)
    }
});

// finding todos through userId
router.get("/:userId", (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let { Task } = JSON.parse(data);
        let result = [];
        for (let i = 0; i < Task.length; i++) {
            if (Task[i].userId == req.params.userId) {
                result.push(Task[i]);
            }
        }
        return res.send(result)
    } catch (error) {
        return res.send({ message: error.message })
    }
})

// create a new task for the user
router.post("/create/:userID", async (req, res) => {

    try {
         fs.readFile(filepath, 'utf8', async(err, data) => {
            if (err) {
                console.log(`Error: ${err}`);
                res.send({ message: err })
            } else {
                req.body.userId = req.params.userID
                req.body.startTime = Date.now();
                req.body.taskId = crypto.randomUUID();
                const databases = JSON.parse(data);
                let singleuser;

                for (let i = 0; i < databases.User.length; i++) {
                    if (databases.User[i].userId == req.params.userID) {
                        singleuser = databases.User[i];
                        break;
                    }
                }
                databases.Task.push(req.body);
                await sendMail(singleuser, req.body).then(result => console.log( result))
                    .catch((err) => console.log(err.message))


                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {
                        console.log(`Error: ${err}`);
                        return res.send({ message: err.message })
                    }
                });
                return res.send(req.body)
            }
        });
    } catch (error) {
        return res.send({ message: error.message })
    }
})




// get the todo with the  ID
router.get("/todo/:Id", (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let { Task } = JSON.parse(data);

        for (let i = 0; i < Task.length; i++) {
            if (Task[i].taskId == req.params.Id) {
                return res.send(Task[i]);
            }
        }

    } catch (error) {
        return res.send({ message: error.message })
    }
})


//delete a todo with the task id
router.delete("/:todoId", (req, res) => {
    console.log(req.params.taskId)
    try {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                // console.log(`Error: ${err}`);
                res.send({ message: err })
            } else {
                let update = null;
                const databases = JSON.parse(data);
                for (let i = 0; i < databases.Task.length; i++) {
                    if (databases.Task[i].taskId == req.params.todoId) {
                        update = databases.Task.splice(i, 1);
                        break;
                    }
                }
                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {
                        console.log(`Error: ${err}`);
                        return res.send({ message: err.message })
                    }
                });
                return res.send(update[0])
            }
        });

    } catch (error) {
        return res.send({ "message": error.message })
    }
})
//  updating task through taskId
router.patch("/:Id", (req, res) => {
    try {
        fs.readFile(filepath, 'utf8', (err, data) => {

            if (err) {
                console.log(`Error reading file from disk: ${err}`);
                res.send({ message: err })
            } else {
                let update = null;
                const databases = JSON.parse(data);
                for (let i = 0; i < databases.Task.length; i++) {
                    if (databases.Task[i].taskId == req.params.Id) {
                        // update = databases.Task.splice(i, 1);
                        databases.Task[i].expiry = req.body.expiry
                        update = databases.Task[i]
                        break;
                    }
                }
                // write new data back to the file
                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {

                        console.log(`Error: ${err}`);
                        return res.send({ message: err.message })
                    }
                });
                return res.send(update)
            }

        });

    } catch (error) {

    }
})


module.exports = router