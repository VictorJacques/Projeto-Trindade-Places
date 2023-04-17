const Place = require("../../models/place");

async function editPlace(req, res) {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
}

module.exports = editPlace;
