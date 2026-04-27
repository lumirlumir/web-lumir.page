ReactDOM.render(
  <>
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
    </ButtonMulti>
  </>,
);
