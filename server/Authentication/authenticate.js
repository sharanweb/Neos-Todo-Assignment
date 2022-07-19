const fs = require('fs');
const crypto = require('crypto');
const path = require("path");
const filepath = path.join(__dirname, "../data.json");
const login = (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        const { User } = JSON.parse(data);
        for (let i = 0; i < User.length; i++) {
            if (User[i].email == req.body.email && User[i].password == req.body.password) {
                return res.send({
                    name: User[i].name,
                    email: User[i].email,
                    mobile: User[i].mobile,
                    userId: User[i].userId,
                })
            }
        }
        return res.send({ message: "Credientials does not match! try again" })
    } catch (error) {
        return res.send({ message: error.message })
    }
}

const register = (req, res) => {

    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let { User } = JSON.parse(data);
        for (let i = 0; i < User.length; i++) {
            if (User[i].mobile == req.body.mobile) {
                return res.send({ message: "User already exists! try with different mobile number" })
            }
        }
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading file from disk: ${err}`);
                res.send({ message: err })
            } else {

                req.body.userId = crypto.randomUUID();

                const databases = JSON.parse(data);
                databases.User.push(req.body);

                // write new data back to the file
                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {

                        console.log(`Error writing file: ${err}`);
                        return res.send({ message: err.message })
                    }
                });
                return res.send({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    userId: req.body.userId
                })
            }
        })
    }
    catch (error) {
        return res.send({ message: error.message })
    }
}
module.exports = { login, register }