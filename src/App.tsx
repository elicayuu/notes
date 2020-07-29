import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import NoteList from './components/NoteList';
import Editor from './components/Editor';

function App() {
  return (
    <Root>
      <Header />
      <Main>
        <Side>
          <NoteList />
        </Side>
        <Content>
          <Editor />
        </Content>
      </Main>
    </Root>
  );
}

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
`

const Side = styled.div`
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  background-color: #f6f6f6;
`;

const Content = styled.div`
  height: calc(100vh - 50px - 5px);
  width: 40%;
`