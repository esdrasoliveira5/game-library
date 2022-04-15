import React, { useContext } from 'react';
import styled from 'styled-components';
import gamesContext from '../context/AppContext';
import GameLibrary from '../services/fetchGameLibrary';

const Select = styled.div`

.selectdiv {
  position: relative;
  min-width: 200px;
}
.selectdiv:after {
  content: '+';
  font: 20px "Consolas", monospace;
  color: #333;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  right: 11px;
  top: 18px;
  padding: 0 0 2px;
  border-bottom: 1px solid #999;
  position: absolute;
  pointer-events: none;
  color: #161A1D;
}

.selectdiv select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  max-width: 320px;
  height: 50px;
  float: right;
  margin: 5px 0px;
  padding: 0px 24px;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  background: rgba(22, 26, 29, 0.3);
  backdrop-filter: blur(8px);
  background-image: none;
  border: 1px solid #cccccc;
  -ms-word-break: normal;
  word-break: normal;
  cursor: pointer;
} 

`;

const Option = styled.option`
  background: #E5383B;
  color: white;
`;

const Button = styled.div`
  .selectdiv:after {
    content: '+';
    font: 17px "Consolas", monospace;
    color: #333;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 11px;
    top: 18px;
    padding: 0 0 2px;
    border-bottom: 1px solid #999;
    position: absolute;
    pointer-events: none;
    color: white;
  }

  position: relative;
  min-width: 200px;
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    max-width: 320px;
    height: 50px;
    float: right;
    margin: 5px 0px;
    padding: 0px 24px;
    font-size: 16px;
    line-height: 1.75;
    color: white;
    background: rgba(0, 248, 21, 0.3);
    backdrop-filter: blur(8px);
    background-image: none;
    border: 1px solid #cccccc;
    -ms-word-break: normal;
    word-break: normal;
  }
  button:hover {
    background: rgba(15, 143, 26, 0.3);
    backdrop-filter: blur(8px);
    cursor: pointer;
  }
`;

function Collection() {
  const { token } = JSON.parse(localStorage.getItem('game-library'));
  const { collection, setCollection } = useContext(gamesContext);
  const { categoriesId, categories, game } = collection;

  async function saveToCollection() {
    const { id, name, background_image: image } = game;
    const data = { id, name, image };
    const response = await GameLibrary.saveGameToCollection(token, data);
    setCollection({
      ...collection,
      categoriesId: response.id,
    });
  }

  async function handleCategories({ target }) {
    const { id } = game;
    const { name, value } = target;
    if (value === 'remove') {
      const data = { gamesId: id };
      await GameLibrary.removeFromCollection(token, data);
      setCollection({
        ...collection,
        categoriesId: 0,
      });
    } else {
      setCollection({
        ...collection,
        [name]: value,
      });
      const data = {
        gamesId: id,
        categoriesId: Number(value),
      };
      await GameLibrary.categoryUpdate(token, data);
    }
  }

  return (
    <div>
      { categoriesId === 0
        ? (
          <Button>
            <div className="selectdiv">
              <button
                type="button"
                onClick={saveToCollection}
              >
                Adicionar a Coleção
              </button>
            </div>
          </Button>
        )
        : (
          <Select>
            <div className="selectdiv">
              <label htmlFor="category">
                <select
                  name="categoriesId"
                  value={categoriesId}
                  onChange={(event) => handleCategories(event)}
                >
                  {categories.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
                  <Option
                    value="remove"
                  >
                    Remover da Coleção
                  </Option>
                </select>
              </label>
            </div>
          </Select>
        )}
    </div>
  );
}

export default Collection;
