import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import { useNote } from '../libs/noteContext';

import { ReactComponent as EditSvg } from '../images/edit.svg';

const MarkdownViewer: React.FC = () => {
  const { currentNote, changeNoteMode, isLoading } = useNote();

  return (
    <Root>
      <EditorHeader>
        <h1>{currentNote?.title}</h1>
      </EditorHeader>
      <EditorContent>
        <ReactMarkdown source={isLoading ? 'Loading...' : currentNote?.content} />
      </EditorContent>
      <Footer>
        <IconButton onClick={() => changeNoteMode('edit')}>
          <EditSvg />
          <span>Edit</span>
        </IconButton>
      </Footer>
    </Root>
  );
};

export default MarkdownViewer;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorHeader = styled.div`
  width: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;

  & > h1 {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    margin: 0;
    padding: 0 10px;
    border: none;
    box-sizing: border-box;
    font-size: 1em;
    font-weight: normal;
  }
`;

const EditorContent = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 0 10px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  border: 1px solid #eee;
  padding: 0 10px;
  background-color: #f6f6f6;
`;

const IconButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
`;