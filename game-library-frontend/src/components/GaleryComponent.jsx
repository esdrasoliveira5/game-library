/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DescriptionsImages = styled.div`
  height: 100%;
  width: 50%;
  padding: 10px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const BigPicture = styled.div`
  position:relative;
  width: 100%;
  margin:0 auto;
  overflow: hidden;
  width:100%;
  img {
    width: 100%;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
  }
  img:hover {
    opacity:0;
    width: 100%;
  }
  .image {
    position:absolute;
    width: 100%;
  }
`;

const Galery = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  margin-top: 5px;
  img {
    margin: 3px;
    width: 200px;
    cursor: pointer;
  }
`;

const Image = styled.div`
  label {
    display: flex;
    align-items: center;
  }
  input {
    display: none;
  }
  input:checked + label {
    position: absolute;
    width: 200%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    top: 0%;
    z-index: 1;
    @media screen and (max-width: 1000px) {
      left: -13%;
      width: 255%;
    }
    img {
      position: absolute;
      width: 50%;
      z-index: 10;
    }
  }
  `;

function GaleryComponent({ images, background: { img, extra } }) {
  return (
    <DescriptionsImages>
      <BigPicture>
        <img className="image" src={img} alt="screenshoots" />
        <img src={extra} alt="screenshoots" />
      </BigPicture>
      <Galery>
        {images.map(({ image }, index) => (
          <div key={image}>
            <Image>
              <input type="checkbox" name="" id={`btnControl${index}`} />
              <label htmlFor={`btnControl${index}`}>
                <img src={image} alt="screenshoots" />
              </label>
            </Image>
          </div>
        ))}
      </Galery>
    </DescriptionsImages>
  );
}

GaleryComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  background: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default GaleryComponent;
