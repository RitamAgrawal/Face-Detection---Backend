import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import register from "./controllers/register.js ";
import signin from "./controllers/signin.js ";
import profile from "./controllers/profile.js ";
import image from "./controllers/image.js ";

// import { handleRegister } from "./controllers/register";
// import handleRegister from "./controllers/register";
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ritam",
    password: "",
    database: "face_detection_db",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is runnning on port 3000");
});


// bcrypt.hash("bacon", null, null, function (err, hash) {
//   // Store hash in your password DB.
// });
// bcrypt.hash(password, null, null, function (err, hash) {
// console.log(hash);
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
// /*
// /root res --> this is working
// / signin --> POST-- success/fail; (can't send in password as querystring)
// /register --> POST( since creating a user) -- user
// /profile/ : userID --> GET -- (fetch user info)
// /image --> PUT -- update user (keeps score of the image served).
// */
// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });
