import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';

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
    border-radius: 10px;
    button {
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
        color: #161A1D;
      }
      button:hover {
        opacity: 100;
        background-color: rgb(237, 242, 244,0.8);
        cursor: pointer;
      }
      p {
        text-align: center;
        width: 80%;
      }
  }
  div:hover {
    transform: scale(1.2);
  }
`;

function CategorieCard({
  id, name, background, slug,
}) {
  const navigate = useNavigate();
  const { searchContext, setSearchContext } = useContext(gamesContext);

  async function handleCategories() {
    setSearchContext({
      ...searchContext,
      page: 1,
      genre: slug,
      searchGenres: true,
      searchBar: false,
    });
    navigate('/home');
  }
  return (
    <CardStyled key={id}>
      <div style={{ backgroundImage: `url(${background})` }}>
        <button
          type="button"
          onClick={handleCategories}
        >
          <p>{name}</p>
        </button>
      </div>
    </CardStyled>
  );
}

CategorieCard.propTypes = {
  background: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CategorieCard;
