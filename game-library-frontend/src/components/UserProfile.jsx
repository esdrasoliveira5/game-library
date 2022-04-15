/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gamesContext from '../context/AppContext';
import ArrowPagesProfile from './ArrowPagesProfile';
import GamesCard from './GamesCard';
import Menu from '../img/Menu.png';
import Close from '../img/Close.png';

const Profile = styled.div`
  color: #F5F3F4;
  border-radius: 10px;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: 95%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  backdrop-filter: blur(8px);
  input[type=checkbox] {
    z-index: 11;
    display: none;
  }
  label {
    display: none;
  }

  @media screen and (max-width: 700px) {
    label {
      position: absolute;
      z-index: 12;
      display: unset;
      height: 200px;
    }
    input[type=checkbox]:not(:checked)+ div{
      display: none;
    }
    input[type=checkbox]:checked + div{
      display: flex;
      position: absolute;
      background-color: rgba(31, 30, 30, 0.651);
      min-width: 100%;
      min-height: 200px;
      left: 0%;
      right: 0%;
      top: 0%;
      bottom: 0%;
      align-items: center;
      z-index: 10;
    }
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(31, 30, 30, 0.192);
  backdrop-filter: blur(8px);
  width: 25%;
  max-width: 200px;
  border-radius: 10px;
  button {
    align-self: baseline;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  button:hover {
    color: #660708;
    transform: scale(1.1);
  }
  a {
    align-self: baseline;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  a:hover {
    color: #660708;
  }
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    img {
      padding: 10px;
      width: 100%;
      max-width: 200px;
    }
    margin-bottom: 20px;
`;

const NavCategories = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
  button {
    transition: transform .2s;
  }
  button:hover {
    color: #660708;
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GamesBox = styled.div`
  width: 60%;
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
    padding-top: 50px;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-height: 600px;
`;

function UserProfile({ categories }) {
  const [menu, setMenu] = useState(true);
  const { logged, userGames, setUserGames } = useContext(gamesContext);

  function handleCategories({ target }) {
    setUserGames({
      ...userGames,
      categoryId: target.value,
      page: 0,
    });
  }

  function handlemenu() {
    setMenu(!menu);
  }

  return (
    <Profile>
      <label for="side">
        <img src={menu ? Menu : Close} alt="menu" width="40px" />
      </label>
      <input type="checkbox" id="side" onClick={handlemenu} />
      <Sidebar>
        <ProfileInfo>
          <img src={logged.avatar} alt="avatar" />
          <div>
            <h1>{logged.name}</h1>
            <h3>{logged.lastName}</h3>
            <h4>{logged.email}</h4>
            <Link to="/profile/edit">Editar</Link>
          </div>
        </ProfileInfo>
        <NavCategories>
          <button value="" onClick={(event) => handleCategories(event)} type="button" key="0">Todos os games</button>
          {
            categories.map(({ name, id }) => <button value={id} onClick={(event) => handleCategories(event)} type="button" key={id}>{name}</button>)
          }
        </NavCategories>
      </Sidebar>
      <Content>
        <ArrowPagesProfile />
        <GamesBox>
          {userGames.games.map(({ games }) => GamesCard(games))}
        </GamesBox>
      </Content>
    </Profile>
  );
}

UserProfile.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default UserProfile;
