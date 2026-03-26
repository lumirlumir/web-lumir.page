import React, { useState } from 'react';
import './ButtonMulti.scss';
import ButtonSingle from '../ButtonSingle';

function ButtonMulti(props) {
  /* Variables */
  // props
  const { children, title, position, top, right, bottom, left } = props;

  // state
  const [visible, setVisible] = useState(false);

  /* Return */
  return (
    <>
      <ButtonSingle
        click={() => {
          setVisible(!visible);
        }}
        title={title}
        position={position}
        top={top}
        right={right}
        bottom={bottom}
        left={left}
      >
        {children[0]}
      </ButtonSingle>

      {visible && children.slice(1)}
    </>
  );
}

export default ButtonMulti;
