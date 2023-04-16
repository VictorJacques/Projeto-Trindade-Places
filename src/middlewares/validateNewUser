const yup = require("yup");

const validation = yup.object().shape({
  name: yup.string("O nome deve ser uma string").required("Nome é obrigatório"),
});

function validateNewUser(req, res, next) {
  console.log(req.method);
  console.log(req.path);
  console.log(req.body);
  console.log(req.params);

  validation.validateSync(req.body);

  next();
}

module.exports = validateNewUser;
