import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import gamesContext from '../context/AppContext';
import GameLibrary from '../services/fetchGameLibrary';
import Rawg from '../services/fetchRawg';
import BlackFlag from '../img/BlackFlag.png';
import CategoriesPage from '../components/Categories';

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
    height: 1100px;
    position: absolute;
    z-index: 0;
    left: -10%;
  }
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 150px;
  width: 100%;
`;

function Categories() {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(gamesContext);
  const { setgenres } = useContext(gamesContext);
  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      if (localResponse !== null) {
        const { token } = localResponse;
        const response = await GameLibrary.getUser(token);
        const genresResponse = await Rawg.fetchGamesgenres();
        if (!response.error) {
          setgenres(genresResponse.results);
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
  return (
    <BigContainer>
      <Header />
      {
        logged.logged ? (
          <MainContainer>
            <Container>
              <img src={BlackFlag} alt="" />
              <CategoriesPage />
            </Container>
          </MainContainer>
        ) : ''
      }
      <Footer />
    </BigContainer>
  );
}

export default Categories;
