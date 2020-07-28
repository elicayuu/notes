import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddSvg } from '../images/add.svg';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Root>
      <Button type="button">
        <AddSvg />
        <span>New note</span>
      </Button>
    </Root>
  );
};

export default Header;

const Root = styled.header`
  display: flex;
  padding: 10px;
  border: 1px solid #eee;
  background-color: #fff;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
`;