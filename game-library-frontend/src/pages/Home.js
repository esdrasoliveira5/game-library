import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import gamesContext from '../context/AppContext';
import GameLibrary from '../services/fetchGameLibrary';
import Rawg from '../services/fetchRawg';
import HomeGamesPage from '../components/HomeGamesPage';
import Tifa from '../img/Tifa.png';
import SearchBar from '../components/SearchBar';
import ArrowPages from '../components/ArrowPages';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background: linear-gradient(90deg, #0B090A 0%, #660708 100%);
`;
const Container = styled.main`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    padding-top: 15%;
    @media screen and (max-width: 1000px) {
      left: 40%;
    }
    height: 1500px;
    position: absolute;
    z-index: 0;
    left: 70%;
  }
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

function Home() {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(gamesContext);
  const { searchContext } = useContext(gamesContext);
  const { games, setGames } = useContext(gamesContext);
  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      if (localResponse !== null) {
        const { token } = localResponse;
        const response = await GameLibrary.getUser(token);
        const gamesResponse = await Rawg.fetchGamesPages(1);
        if (!response.error) {
          if (games.length === 0) {
            setGames(gamesResponse.results);
          }
          setLogged({
            ...response,
            logged: true,
          });
        } else {
          setLogged({ logged: false });
          navigate('/');
        }
      } else {
        setLogged({ logged: false });
        navigate('/');
      }
    };
    userLogged();
  }, []);

  useEffect(() => {
    const {
      searchBar, searchGenres, search, ordering, page, genre,
    } = searchContext;
    const searchGames = async () => {
      const gamesResponse = await Rawg.fetchSearchGames(page, ordering, search);
      setGames(gamesResponse.results);
    };
    const searchCategorieGames = async () => {
      const gamesGenre = await Rawg.fetchGamesByGenre(page, genre);
      setGames(gamesGenre.results);
    };
    if (searchBar === true) {
      searchGames();
    } else if (searchGenres === true) {
      searchCategorieGames();
    }
  }, [searchContext]);
  return (
    <BigContainer>
      <Header />
      {
        logged.logged ? (
          <MainContainer>
            <SearchBar />
            <Container>
              {
                searchContext.searchBar === true || searchContext.searchGenres === true ? <ArrowPages /> : ''
              }
              <img src={Tifa} alt="" />
              <HomeGamesPage />
            </Container>
          </MainContainer>
        ) : ''
      }
      <Footer />
    </BigContainer>
  );
}

export default Home;
