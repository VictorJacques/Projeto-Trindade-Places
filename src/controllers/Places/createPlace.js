const Place = require("../../models/place");

async function createPlace(req, res) {
  try {
    const lugar = {
      name: req.body.name,
      tel: req.body.tel,
      openingHours: req.body.openingHours,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user_id: req.body.userId,
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
}

module.exports = createPlace;
