import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import loginValidate from '../helpers/loginValidate';
import GameLibrary from '../services/fetchGameLibrary';

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    border-radius: 5px;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  input:focus {
    background: #dbdbdb;
  }
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #E5383B;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  button:hover {
    background-color: #660708;
  }
`;

function FormsLogin() {
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  function handleLogin({ target }) {
    const { name, value } = target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  }

  async function sendLogin() {
    const validation = loginValidate(loginValues);
    if (validation === 'Logando Usuario') {
      const result = await GameLibrary.loginUser(loginValues);
      if (result.token) {
        localStorage.setItem('game-library', JSON.stringify({ token: result.token }));
        global.alert('Bem Vindo!');
        navigate('/home');
      } else {
        global.alert(result.error);
      }
    } else {
      global.alert(validation);
    }
  }

  const { email, password } = loginValues;
  return (
    <FormLogin>
      <label htmlFor="email">
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <label htmlFor="password">
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(event) => handleLogin(event)}
        />
      </label>
      <button
        type="button"
        onClick={sendLogin}
      >
        Login
      </button>
      <Link to="/register">
        <button
          type="button"
        >
          Cadastrar

        </button>
      </Link>
    </FormLogin>
  );
}

export default FormsLogin;
