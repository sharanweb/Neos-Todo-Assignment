const express = require("express");
const router = express.Router();
const fs = require('fs');

const path = require("path");
const filepath = path.join(__dirname, "../data.json");

// get all users
router.get("/", async (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        const { User } = JSON.parse(data);
        return res.send(User)
    } catch (err) {
        return res.send(err)
    }
})



// get user by id 
router.get("/:id", async (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let { User } = JSON.parse(data);
        for (let i = 0; i < User.length; i++) {
            if (User[i].userId == req.params.id) {
                return res.send(User[i])
            }
        }
    } catch (error) {
        return res.send(error.message)
    }
})

// delete a user by ID 
router.delete("/:id",(req,res)=>{
    try {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.send({ message: err })
            } else {
                let update = null;
                const databases = JSON.parse(data);
                for (let i = 0; i < databases.User.length; i++) {
                    if (databases.User[i].userId == req.params.id) {
                        update = databases.User.splice(i,1);
                        break;
                    }
                }
                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {
                        return res.send({ message: err.message })
                    }
                });
                return res.send(update)
            }
        });
    } catch (error) {
        return res.send(err)
    }
})

module.exports = router