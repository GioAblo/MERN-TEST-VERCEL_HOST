const express = require("express")
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');


app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://user123:Password231@cluster0.auxaggk.mongodb.net/MERN")
 
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
    res.send("runs")
})

 
app.listen(3001, () => {
    console.log("server runs localhost 3001");
})