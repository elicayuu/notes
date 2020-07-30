import React from 'react';
import styled from 'styled-components';

import { useNote } from '../libs/noteContext';
import { ReactComponent as AddSvg } from '../images/add.svg';

const Header: React.FC = () => {
  const { mode, changeNoteMode } = useNote();

  const onNewNote = () => {
    if (mode === 'edit') return;
    changeNoteMode('create');
  }

  return (
    <Root>
      <Button type="button" onClick={onNewNote}>
        <AddSvg />
        <span>New note</span>
      </Button>
    </Root>
  );
};

export default Header;

const Root = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
`;