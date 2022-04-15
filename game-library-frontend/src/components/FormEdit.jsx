import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';
import registerValues from '../helpers/registerValues';
import GameLibrary from '../services/fetchGameLibrary';
import Avatar from './Avatar';

const FormRegisters = styled.form`
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
  p{
    font-size: 12px;
    color: #161A1D;
  }
`;
const ButtonGreen = styled.div`
  outline: 0;
  background: #2dc653;
  border: 0;
  border-radius: 5px;
  button {
    text-transform: uppercase;
    outline: 0;
    background: #2dc653;
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
    background-color: #207034;
  }
`;

const ButtonRed = styled.div`
  outline: 0;
  background: #E5383B;
  border: 0;
  border-radius: 5px;
  margin-top: 10px;
  button {
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

function FormEdit() {
  const { logged, setLogged } = useContext(gamesContext);
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: logged.name,
    lastName: logged.lastName,
    email: logged.email,
    password: '',
    passwordConfirm: '',
    avatar: 'https://avatarfiles.alphacoders.com/183/183310.jpg',
  });

  function handleInfo({ target }) {
    const { name, value } = target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  }
  async function updateUser() {
    const validation = registerValues(registerInfo);
    if (validation === 'Criando Usuario') {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      const result = await GameLibrary.updateUser(localResponse.token, registerInfo);
      if (result.id) {
        setLogged({
          ...logged,
          name: registerInfo.name,
          lastName: registerInfo.lastName,
          avatar: registerInfo.avatar,
        });
        global.alert('Usuario Atualizado');
        navigate('/profile');
      } else {
        global.alert(result.error);
      }
    } else {
      global.alert(validation);
    }
  }
  async function deleteUser() {
    const response = global.confirm('Excluir a conta ?');
    if (response === true) {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      await GameLibrary.deleteUser(localResponse.token);
      global.alert('Usuario deletado!');
      navigate('/');
    }
  }

  const {
    name, lastName, email, password, passwordConfirm,
  } = registerInfo;
  return (
    <FormRegisters>
      <p>Clique na imagem para alterar o avatar.</p>
      <Avatar avatar={{ registerInfo, setRegisterInfo }} />
      <label htmlFor="name">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Nome"
          onChange={(event) => handleInfo(event)}
        />
      </label>
      <label htmlFor="lastName">
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Sobrenome"
          onChange={(event) => handleInfo(event)}
        />
      </label>
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          value={email}
          disabled
          placeholder="Email"
          onChange={(event) => handleInfo(event)}
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(event) => handleInfo(event)}
        />
      </label>
      <label htmlFor="passwordConfirm">
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="Confirme a Senha"
          onChange={(event) => handleInfo(event)}
        />
      </label>
      <ButtonGreen>
        <button
          type="button"
          onClick={updateUser}
        >
          Salvar
        </button>
      </ButtonGreen>
      <ButtonRed>
        <button
          type="button"
          onClick={deleteUser}
        >
          Excluir conta
        </button>
      </ButtonRed>
    </FormRegisters>
  );
}

export default FormEdit;
