const validate = require('react-email-validator');

const registerValues = (data) => {
  const {
    name, lastName, email, password, passwordConfirm,
  } = data;
  if (!name || !lastName || !email || !password || !passwordConfirm) {
    return 'Todos os campos precisam estar preenchidos!';
  }

  const validateEmail = validate.validate(email);
  if (!validateEmail) {
    return 'Email Invalido';
  }

  if (password.length < 9) {
    return 'Senha precisa ser maior que 8 caracteries';
  }
  if (password !== passwordConfirm) {
    return 'Senha Invalida';
  }

  return 'Criando Usuario';
};
export default registerValues;
