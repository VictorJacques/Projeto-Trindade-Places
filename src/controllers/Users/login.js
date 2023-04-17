const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const userInDatabase = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!userInDatabase) {
      return res.status(404).json({ message: "Credenciais incorretas" });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      userInDatabase.password
    );

    if (!passwordIsValid) {
      return res.status(404).json({ message: "Credenciais incorretaaaaas" });
    }

    const token = jwt.sign(
      {
        id: userInDatabase.id,
      },
      process.env.CHAVE_DO_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.json({ name: userInDatabase.username, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
}

module.exports = login;
