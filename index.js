const express = require("express")
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT

app.use(express.json())
app.use(cors());


mongoose.connect(process.env.MONGO_URL)

 
// app.get("/getUsers", (req, res) => {
//     UserModel.find({}, (err, result) => {
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     })
// });

app.get("/getUsers", (req, res) => {
    UserModel.find({}).exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});


app.post("/createUser", async (rec, res) => {
    const user = rec.body;
    const newUser = new UserModel(user);
    await newUser.save();
    
    res.json(user)
    
})

app.use("/run", (req, res) => {
    res.send("runsssssss")
})

 
app.listen(port, () => {
    console.log("server runs localhost 3001");
})