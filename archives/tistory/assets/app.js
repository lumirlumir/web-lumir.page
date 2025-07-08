import React from 'react';
import ReactDOM from 'react-dom';

import { FaArrowUp } from 'react-icons/fa6';
import { AiOutlineMenu, AiOutlineLink, AiOutlineGithub, AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai';
import { GrSoundcloud } from 'react-icons/gr';

import ScrollBar from './components/ScrollBar';
import ProgBar from './components/ProgBar';
import ButtonSingle from './components/ButtonSingle';
import ButtonMulti from './components/ButtonMulti';

ReactDOM.render(
  <>
    <ScrollBar />

    <ProgBar />

    <ButtonSingle
      click={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
      title="Top"
      position="fixed"
      right="40px"
      bottom="40px"
    >
      <FaArrowUp color="gray" size={16} />
    </ButtonSingle>

    <ButtonSingle
      click={() => {
        document.querySelector('body').classList.toggle('sideMenu');
      }}
      title="Menu"
      position="fixed"
      right="80px"
      bottom="40px"
    >
      <AiOutlineMenu color="gray" size={18} />
    </ButtonSingle>

    <ButtonMulti title="Links" position="fixed" right="120px" bottom="40px">
      <AiOutlineLink color="gray" size={19} />

      <ButtonSingle
        click={() => {
          window.open('https://github.com/');
        }}
        title="Github"
        position="fixed"
        right="120px"
        bottom="80px"
      >
        <AiOutlineGithub color="gray" size={18} />
      </ButtonSingle>

      <ButtonSingle
        click={() => {
          window.open('https://www.instagram.com/');
        }}
        title="Instagram"
        position="fixed"
        right="120px"
        bottom="120px"
      >
        <AiOutlineInstagram color="gray" size={19} />
      </ButtonSingle>

      <ButtonSingle
        click={() => {
          window.open('https://soundcloud.com/');
        }}
        title="Soundcloud"
        position="fixed"
        right="120px"
        bottom="160px"
      >
        <GrSoundcloud color="gray" size={17} />
      </ButtonSingle>

      <ButtonSingle
        click={() => {
          window.open('https://www.youtube.com/');
        }}
        title="Youtube"
        position="fixed"
        right="120px"
        bottom="200px"
      >
        <AiOutlineYoutube color="gray" size={18} />
      </ButtonSingle>
    </ButtonMulti>
  </>,

  document.getElementById('React'),
);
