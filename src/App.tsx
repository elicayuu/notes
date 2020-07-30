import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteContent from './components/NoteContent';

import { NoteProvider } from './libs/noteContext';

function App() {
  return (
    <NoteProvider>
      <Root>
        <Header />
        <Main>
          <Side>
            <NoteList />
          </Side>
          <Content>
            <NoteContent />
          </Content>
        </Main>
      </Root>
    </NoteProvider>
  );
};

export default App;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  height: calc(100vh - 50px - 5px);
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #fff;
`;

const Side = styled.div`
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  background-color: #f6f6f6;
`;

const Content = styled.div`
  height: calc(100vh - 50px - 5px);
  width: 40%;
`;