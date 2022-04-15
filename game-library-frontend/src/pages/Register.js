import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import FormRegister from '../components/FormRegister';
import Header from '../components/Header';
import gamesContext from '../context/AppContext';
import Mario from '../img/Mario.png';
import GameLibrary from '../services/fetchGameLibrary';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(90deg, #E5383B 0%, #660708 100%);
`;

const MainContainer = styled.main`
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  max-width: 500px;
  padding: 45px;
  text-align: center;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  overflow: scroll;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1100px) {
    position: absolute;
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    position: absolute;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

function Register() {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(gamesContext);
  useEffect(() => {
    const userLogged = async () => {
      const localResponse = JSON.parse(localStorage.getItem('game-library'));
      if (localResponse !== null) {
        const { token } = localResponse;
        const response = await GameLibrary.getUser(token);
        if (!response.error) {
          setLogged({
            ...response,
            logged: true,
          });
          navigate('/home');
        } else {
          setLogged({ logged: false });
        }
      } else {
        setLogged({ logged: false });
      }
    };
    userLogged();
  }, []);
  return (
    <BigContainer>
      <Header />
      {
          !logged.logged ? (
            <Container>
              <MainContainer>
                <h1>Cadastrar</h1>
                <FormRegister />
              </MainContainer>
              <img src={Mario} alt="mario" height="900px" />
            </Container>
          )
            : ''
        }
      <Footer />
    </BigContainer>
  );
}

export default Register;
