import React from 'react';
import styled from 'styled-components';

const NoteList: React.FC = () => {
  return (
    <Root>
      <Item>123</Item>
      <Item>123</Item>
      <Item>123</Item>
    </Root>
  );
}

export default NoteList;

const Root = styled.div`

`;

const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  border: 1px solid #eee;
  background-color: #fff;

  &:focus {
    outline: none;
  }

  &:not(:first-child) {
    border-width: 0 1px 1px 1px;
  }
`