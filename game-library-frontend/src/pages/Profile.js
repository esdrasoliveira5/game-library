import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import gamesContext from '../context/AppContext';
import LARA from '../img/LARA2.png';
import GameLibrary from '../services/fetchGameLibrary';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  background: linear-gradient(90deg, #E5383B 0%, #660708 100%);
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  overflow: hidden;
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
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
    padding-top: 10%;
    height: 130%;
    position: absolute;
    z-index: 0;
    right: 25%;
`;

function Profile() {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(gamesContext);
  const { userGames, setUserGames } = useContext(gamesContext);
  const [categories, setCatgories] = useState([]);
  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      if (localResponse !== null) {
        const { token } = localResponse;
        const response = await GameLibrary.getUser(token);
        const categoriesResp = await GameLibrary.getCategories(token);
        const gamesResponse = await GameLibrary.getUserGames(token, 0, '');
        if (!response.error) {
          if (userGames.games.length === 0) {
            setUserGames({
              ...userGames,
              games: gamesResponse,
            });
          }
          setLogged({
            ...response,
            logged: true,
          });
          setCatgories(categoriesResp);
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
    const fetchCategory = async () => {
      console.log('Mudou');
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      const { token } = localResponse;
      const gamesResponse = await GameLibrary.getUserGames(
        token,
        userGames.page,
        userGames.categoryId,
      );
      setUserGames({
        ...userGames,
        games: gamesResponse,
      });
    };
    fetchCategory();
  }, [userGames.categoryId, userGames.page]);
  return (
    <BigContainer>
      <Header />
      {
        logged.logged ? (
          <MainContainer>
            <Container>
              <UserProfile categories={categories} />
              <Image src={LARA} alt="Master Chief" />
            </Container>
          </MainContainer>
        ) : ''

      }
      <Footer />
    </BigContainer>
  );
}

export default Profile;
