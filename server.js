require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Mongoose connection to MongoDB database.
const db = require("./models");
const dbConfig = require('./config/db.config');
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// This helps create 3 important rows in roles collection.
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'moderator' to roles collection");
              });
        
              new Role({
                name: "admin"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'admin' to roles collection");
              });
        }
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});