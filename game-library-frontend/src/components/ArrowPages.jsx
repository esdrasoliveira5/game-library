import React, { useContext } from 'react';
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

function ArrowPages() {
  const { searchContext, setSearchContext } = useContext(gamesContext);
  const { page } = searchContext;

  function handlePages(position) {
    if (position === 'right' && page < 10) {
      const value = page + 1;
      setSearchContext({
        ...searchContext,
        page: value,
      });
    } else if (position === 'left' && page === 1) {
      setSearchContext({
        ...searchContext,
        page: 1,
      });
    } else if (page === 10 && position === 'right') {
      setSearchContext({
        ...searchContext,
        page: 10,
      });
    } else {
      const value = page - 1;
      setSearchContext({
        ...searchContext,
        page: value,
      });
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
      <input type="number" value={page} />
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

export default ArrowPages;
