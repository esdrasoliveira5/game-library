import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';

const ArrowContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  input {
    width: 50px;
    border-left: 0;
    border-right: 0;
    color: #747474;
    font-size: 18px;
    font-weight: 700;
    z-index: 1;
    position: relative;
    display: block;
    float: left;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0px;
    text-align: center;
    line-height: 40px;
    outline: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  button {
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
    i {
      width: 20px;
      height: 20px;
      border: solid #BA181B;
      border-width: 0 5px 5px 0;
      display: inline-block;
      padding: 3px;
    }
    i:hover {
      width: 20px;
      height: 20px;
      border: solid #44090a;
      border-width: 0 5px 5px 0;
      display: inline-block;
      padding: 3px;
    }
  }
`;
const ArrowLeft = styled.i`
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;
const ArrowRight = styled.i`
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

function ArrowPagesProfile() {
  const { userGames, setUserGames } = useContext(gamesContext);
  const { page } = userGames;
  const [arrow, setArrow] = useState(1);

  useEffect(() => {
    setArrow(page / 20 + 1);
  }, [userGames]);

  function handlePages(position) {
    if (position === 'right' && userGames.games.length === 20) {
      const value = page + 20;
      setUserGames({
        ...userGames,
        page: value,
      });
      setArrow(arrow + 1);
    } else if (position === 'left' && page > 0) {
      const value = page - 20;
      setUserGames({
        ...userGames,
        page: value,
      });
      setArrow(arrow - 1);
    }
  }
  return (
    <ArrowContainer>
      <button
        type="button"
        name="left"
        onClick={() => handlePages('left')}
      >
        <ArrowLeft />
      </button>
      <input type="number" value={arrow} />
      <button
        type="button"
        name="right"
        onClick={() => handlePages('right')}
      >
        <ArrowRight />
      </button>
    </ArrowContainer>
  );
}

export default ArrowPagesProfile;
