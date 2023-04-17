const Place = require("../../models/place");

async function listPlaces(req, res) {
  try {
    console.log("User Id: " + req.body.userId);
    const places = await Place.findAll({
      where: {
        user_id: req.body.userId,
      },
    });
    res.json(places);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
}

module.exports = listPlaces;
