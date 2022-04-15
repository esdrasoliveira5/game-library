/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

const avatars = [
  {
    name: 'Master-chief',
    src: 'https://avatarfiles.alphacoders.com/183/183310.jpg',
  },
  {
    name: 'Link',
    src: 'https://avatarfiles.alphacoders.com/837/83744.jpg',
  },
  {
    name: 'Call-of-duty',
    src: 'https://avatarfiles.alphacoders.com/147/147960.jpg',
  },
  {
    name: 'Watch-dogs-2',
    src: 'https://avatarfiles.alphacoders.com/703/thumb-1920-70381.jpg',
  },
  {
    name: 'Faith-Connors',
    src: 'https://avatarfiles.alphacoders.com/592/59249.png',
  },
  {
    name: 'No.2',
    src: 'https://avatarfiles.alphacoders.com/125/thumb-1920-125171.png',
  },
  {
    name: 'Dead-space',
    src: 'https://avatarfiles.alphacoders.com/968/thumb-1920-968.jpg',
  },
  {
    name: '2b',
    src: 'https://avatarfiles.alphacoders.com/932/thumb-1920-93221.jpg',
  },
  {
    name: 'Fallout-new-vegas',
    src: 'https://avatarfiles.alphacoders.com/977/thumb-1920-97744.jpg',
  },
  {
    name: 'Ciri',
    src: 'https://avatarfiles.alphacoders.com/840/thumb-1920-84098.jpg',
  },
  {
    name: 'Borderlands',
    src: 'https://avatarfiles.alphacoders.com/730/thumb-1920-73028.jpg',
  },
  {
    name: 'Ahri',
    src: 'https://avatarfiles.alphacoders.com/182/thumb-1920-182468.jpg',
  },
];

const AvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 160px;
  width: 1px;
  margin-bottom: 10px;

  div {
    position: relative;
    z-index: 1;
    border-radius: 10px;
    max-width: 500px;
    margin: 0 auto 100px;
    width: 100%;
    position: absolute;
    flex-wrap: wrap;
    left: 0%;
    right: 0%;
    padding: 10px;
    button {
      background:none;
      border:none;
      margin:0;
      padding:0;
      cursor: pointer;
    }
  }
  img {
    width: 135px;
    padding: 2px;
    border-radius: 10px;
    transition: all .5s ease-in-out;
  }
  img:hover {
        opacity: 100;
        background-color: #F5F3F4;
        cursor: pointer;
        transform: scale(1.2);
      }
`;

function Avatar({ avatar: { registerInfo, setRegisterInfo } }) {
  const [avatar, setAvatar] = useState({
    src: 'https://avatarfiles.alphacoders.com/183/183310.jpg',
    alt: 'Master-chief',
    open: false,
  });

  function handleAvatar({ target }) {
    setAvatar({
      src: target.src,
      alt: target.alt,
      open: !avatar.open,
    });
    setRegisterInfo({
      ...registerInfo,
      avatar: target.src,
    });
  }
  const { src, alt, open } = avatar;
  return (
    <AvatarBox>
      <div>
        { open
          ? avatars.map(({ name, src: img }) => (
            <button
              type="button"
            >
              <img
                src={img}
                alt={name}
                name="avatar"
                onClick={handleAvatar}
              />
            </button>
          ))
          : (
            <button
              type="button"
            >
              <img
                src={src}
                alt={alt}
                name="avatar"
                onClick={handleAvatar}
              />
            </button>
          )}

      </div>
    </AvatarBox>
  );
}

Avatar.propTypes = {
  avatar: PropTypes.shape({
    registerInfo: PropTypes.objectOf(PropTypes.string).isRequired,
    setRegisterInfo: PropTypes.func.isRequired,
  }).isRequired,
};

export default Avatar;
