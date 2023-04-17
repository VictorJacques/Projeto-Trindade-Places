const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  try {
    const userInDatabase = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const userInDatabase2 = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userInDatabase || userInDatabase2) {
      return res
        .status(409)
        .json({ message: "Já existe um usuário com essa conta." });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    };

    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não conseguimos processar sua solicitação." });
  }
}

module.exports = createUser;
