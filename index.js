const express = require("express");
const connection = require("./src/database");
const app = express();
app.use(express.json());

connection.authenticate();

const places = [];

app.get("/places", (req, res) => {
  console.log("Get");
  res.json(places);
});

app.post("/places", (req, res) => {
  const place = {
    name: req.body.name,
    tel: req.body.tel,
    openingHours: req.body.openingHours,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  places.push(place);
  res.status(201).json(place);
});

app.listen(3333, () => console.log("Server Online"));
