/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Collection from './Collection';
import GaleryComponent from './GaleryComponent';

const DescriptionContainer = styled.div`
  color: #F5F3F4;
  border-radius: 10px;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  backdrop-filter: blur(8px);
  @media screen and (max-width: 1000px) {
    width: 80%;
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;

const DescriptionsText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60%;
  padding: 10px;
  @media screen and (max-width: 1000px) {
    width: 80%;
  }
`;
const Text = styled.p`
  display: inline;
  width: 100%;
  button {
    color: #F5F3F4;
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
  }
`;
const MetaScore = styled.div`
  padding: 1px;
  border: 1px solid;
  border-radius: 5px;
  color: #6dc849;
  border-color: rgba(109,200,73,.4);
  `;

const Fields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    margin: 2px;
  }
`;

function DescriptionGame({ game, screenshoots }) {
  const {
    name,
    description,
    metacritic,
    released,
    background_image: backgroundImage,
    background_image_additional: backgroundImageExtra,
    rating,
    parent_platforms: platforms,
    genres,
  } = game;
  const strippedString = description.replace(/(<([^>]+)>)/gi, '');
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <DescriptionContainer>
      <GaleryComponent
        images={screenshoots}
        background={{ img: backgroundImage, extra: backgroundImageExtra }}
      />
      <DescriptionsText>
        <h1>{name}</h1>
        <Text>
          {isReadMore ? strippedString.slice(0, 150) : strippedString}
          <button type="button" onClick={toggleReadMore}>
            {isReadMore ? '...leia mais' : ' mostrar menos'}
          </button>
        </Text>
        <Collection />
        <Fields>
          {'Metacritic:  '}
          <MetaScore>
            {metacritic}
          </MetaScore>
        </Fields>
        <p>{`Ano de lancamento: ${released}`}</p>
        <Fields>
          {'Avaliação: '}
          <p style={{ color: 'yellow', border: '1px solid', borderRadius: '5px' }}>{rating}</p>
        </Fields>
        <Fields>{platforms.map(({ platform }) => <p key={platform.id}>{platform.name}</p>)}</Fields>
        <Fields>{genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}</Fields>
      </DescriptionsText>
    </DescriptionContainer>
  );
}

DescriptionGame.propTypes = {
  game: PropTypes.shape({
    background_image: PropTypes.string.isRequired,
    background_image_additional: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    metacritic: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    parent_platforms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    rating: PropTypes.number.isRequired,
    released: PropTypes.string.isRequired,
  }).isRequired,
  screenshoots: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default DescriptionGame;
