const validate = require('react-email-validator');

const loginValidate = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return 'Todos os campos precisam estar preenchidos!';
  }

  const validateEmail = validate.validate(email);
  if (!validateEmail) {
    return 'Email Invalido';
  }

  if (password.length < 9) {
    return 'Senha precisa ser maior que 8 caracteries';
  }

  return 'Logando Usuario';
};
export default loginValidate;
