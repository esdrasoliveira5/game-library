import React from 'react';
import styled from 'styled-components';
import Github from '../img/Github.png';

const FooterS = styled.footer`
  background-color: #0B090A;
  color: #F5F3F4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
`;

function Footer() {
  return (
    <FooterS>
      <p>© Game Library by Esdras Oliveira</p>
      <div>
        <a
          href="https://linkedin.com/in/esdrasmoliveira"
          target="blank"
          rel="noreferrer"
        >
          <img
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="esdrasmoliveira"
            height="20"
            width="30"
          />
        </a>
        <a
          href="https://github.com/esdrasoliveira5"
          target="blank"
          rel="noreferrer"
        >
          <img
            align="center"
            src={Github}
            alt="esdrasm.oliveira"
            height="20"
            width="20"
          />
        </a>
      </div>
    </FooterS>
  );
}

export default Footer;
