const Place = require("../../models/place");

async function deletePlace(req, res) {
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
}

module.exports = deletePlace;
