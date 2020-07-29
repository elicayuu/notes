import React from 'react';
import styled from 'styled-components';

const NoteList: React.FC = () => {
  return (
    <Root>
      <Item>123</Item>
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
  height: 40px;
  margin: 3px 0;
  border: none;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`