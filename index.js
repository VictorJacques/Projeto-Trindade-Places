require("dotenv").config();
const express = require("express");

const connection = require("./src/database");

const log = require("./src/middlewares/log");
const validateNewUser = require("./src/middlewares/validateNewUser");
const validateToken = require("./src/middlewares/validate-token");

const createPlace = require("./src/controllers/Places/createPlace");
const listPlaces = require("./src/controllers/Places/listPlaces");
const deletePlace = require("./src/controllers/Places/deletePlace");
const editPlace = require("./src/controllers/Places/editPlace");
const createUser = require("./src/controllers/Users/createUser");
const login = require("./src/controllers/Users/login");

const app = express();
app.use(express.json());

app.use(log);

connection.authenticate();
connection.sync({ alter: true });

app.get("/places", validateToken, listPlaces);
app.post("/places", validateToken, createPlace);
app.delete("/places/:id", validateToken, deletePlace);
app.put("/places/:id", validateToken, editPlace);

app.post("/users", validateNewUser, createUser);

app.post("/users/login", login);

app.listen(3333, () => console.log("Server Online"));
