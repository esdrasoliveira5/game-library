import React, { useContext } from 'react';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';
import CategorieCard from './CategorieCard';

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
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
`;

function CategoriesPage() {
  const { genres } = useContext(gamesContext);
  return (
    <GamesBox>
      {
        genres.map(
          ({
            id, name, image_background: background, slug,
          }) => CategorieCard({
            id, name, background, slug,
          }),
        )
      }
    </GamesBox>
  );
}

export default CategoriesPage;
