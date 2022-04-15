import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';
import Logo from '../img/Logo2.png';

const HeaderS = styled.header`
  font-size: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: rgb(22, 26, 29, 0.8);
  color: #F5F3F4;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  img {
    width: 200px;
  }
`;

const NavS = styled.nav`
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin: 10px;
    text-decoration: none;
    text-transform: uppercase;
    outline: 0;
    background: #E5383B;
    border: 0;
    border-radius: 5px;
    padding: 10px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  a:hover {
    background-color: #660708;
  }

`;

const Profile = styled.div`
  background: #E5383B;
  padding: 2px;
  border-radius: 5px;
  width: 130px;
  a {
    display: flex;
    flex-direction: row;
    color: white;
    margin: 2px;
    img {
    width: 40px;
    margin: 2px;
    }
    div{
      margin-left: 10px;
      button {
        text-transform: uppercase;
        outline: 0;
        background: #575251;
        border: 0;
        border-radius: 5px;
        padding: 5px;
        color: #FFFFFF;
        font-size: 10px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
      }
      button:hover {
        background: #0B090A;
        cursor: pointer;
      }
    }
  }
  :hover {
    background: #660708;
    cursor: pointer;
  }
`;

function Header() {
  const { logged, setLogged } = useContext(gamesContext);

  function handleSignOff() {
    localStorage.removeItem('game-library');
    setLogged(false);
    window.location.reload();
  }
  return (
    <HeaderS>
      <Link to="/home">
        <img src={Logo} alt="logo" />
      </Link>
      {
        !logged.logged
          ? (
            <NavS>
              <Link to="/">
                Login
              </Link>
            </NavS>
          )
          : (
            <Profile>
              <Link to="/profile">
                <img src={logged.avatar} alt="avatar" />
                <div>
                  <p>{logged.name}</p>
                  <button
                    type="button"
                    onClick={handleSignOff}
                  >
                    Sair
                  </button>
                </div>
              </Link>
            </Profile>
          )
      }
    </HeaderS>
  );
}

export default Header;
