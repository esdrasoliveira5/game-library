import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import FormEdit from '../components/FormEdit';
import Header from '../components/Header';
import gamesContext from '../context/AppContext';
import DMC from '../img/DevilMayCry.png';
import GameLibrary from '../services/fetchGameLibrary';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
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
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
    padding-top: 10%;
    height: 1100px;
    z-index: 0;
    right: 25%;
`;

function EditProfile() {
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
            <Container>
              <Image src={DMC} alt="DMC" />
              <MainContainer>
                <h1>Editar</h1>
                <FormEdit />
              </MainContainer>
            </Container>
          )
            : ''
        }
      <Footer />
    </BigContainer>
  );
}

export default EditProfile;
