const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;

  if (!token || token === "Bearer") {
    return res.status(403).json({ message: "Token não presente" });
  }

  const tokenJwt = token.slice(7);

  jwt.verify(tokenJwt, "minha_chave_secreta", (error, tokenContent) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token Expirado" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Token Inválido" });
      }
    } else {
      next();
    }
  });
}

module.exports = validateToken;
