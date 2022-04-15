import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../img/Logo.png';

const CardStyled = styled.div`
  width: 20%;
  @media screen and (max-width: 1800px) {
    width: 25%;
  }
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  padding: 5px;
  overflow: hidden;
  display: flex;
  height: 200px;
  div {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    height: 100%;
    transition: all .5s ease-in-out;
    cursor: pointer;
    border-radius: 10px;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        opacity: 0;
        font-size: 22px;
        transition: all .5s ease-in-out;
        text-decoration: none;
        color: #0B090A;
      }
      a:hover {
        opacity: 100;
        background-color: rgb(237, 242, 244,0.8);
      }
      p {
        text-align: center;
        width: 80%;
      }
  }
  div:hover {
    transform: scale(1.2);
    font-size: 15;
  }
`;

function GamesCard({
  id, name, background, image,
}) {
  const backImage = image || background;
  return (
    <CardStyled key={id}>
      <div style={{ backgroundImage: `url(${backImage === null ? Logo : backImage})` }}>
        <Link to={`/game/${id}`}>
          <p>{name}</p>
        </Link>
      </div>
    </CardStyled>
  );
}

GamesCard.propTypes = {
  background: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default GamesCard;
