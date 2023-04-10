const express = require("express");
const connection = require("./src/database");

const Place = require("./src/models/place");
const User = require("./src/models/user");
const { TableHints } = require("sequelize");

const app = express();
app.use(express.json());

connection.authenticate();
connection.sync({ alter: true });

app.get("/places", async (req, res) => {
  try {
    console.log("Get");
    const places = await Place.findAll();
    res.json(places);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
});

app.post("/places", async (req, res) => {
  try {
    const lugar = {
      name: req.body.name,
      tel: req.body.tel,
      openingHours: req.body.openingHours,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };
    if (!lugar.name) {
      return res.status(401).json({
        message: "Nome é obrigatório",
      });
    }

    const placeInDatabase = await Place.findOne({
      where: { name: lugar.name },
    });
    if (placeInDatabase !== null) {
      return res.status(401).json({
        message: "Já existe um lugar com esse nome!",
      });
    }

    const newPlace = await Place.create(lugar);
    res.status(201).json(newPlace);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
});

app.delete("/places/:id", async (req, res) => {
  try {
    const placeInDatabase = await Place.findOne({
      where: { id: req.params.id },
    });
    if (placeInDatabase == null) {
      return res.status(401).json({
        message: "Não existe um lugar com esse ID!",
      });
    }

    await Place.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Deletado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
});

app.put("/places/:id", async (req, res) => {
  try {
    const placeInDatabase = await Place.findByPk(req.params.id);
    if (!placeInDatabase) {
      return res.status(404).json({
        message: "Não existe um lugar com esse ID!",
      });
    }

    placeInDatabase.name = req.body.name;
    placeInDatabase.tel = req.body.tel;
    placeInDatabase.openingHours = req.body.openingHours;
    placeInDatabase.description = req.body.description;
    placeInDatabase.latitude = req.body.latitude;
    placeInDatabase.longitude = req.body.longitude;

    await placeInDatabase.save();

    res.json(placeInDatabase);
  } catch (error) {}
});

app.post("/users", async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
});

app.listen(3333, () => console.log("Server Online"));
