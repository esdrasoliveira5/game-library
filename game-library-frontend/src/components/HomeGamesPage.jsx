import React, { useContext } from 'react';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';
import GamesCard from './GamesCard';

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

function HomeGamesPage() {
  const { games } = useContext(gamesContext);
  return (
    <GamesBox>
      {
        games ? games.map(
          ({
            id, name, background_image: background,
          }) => GamesCard({
            id, name, background,
          }),
        ) : ''
      }
    </GamesBox>
  );
}

export default HomeGamesPage;
