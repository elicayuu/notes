import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNote } from '../libs/noteContext';

import { ReactComponent as ClearSvg } from '../images/clear.svg';
import { ReactComponent as SaveSvg } from '../images/save.svg';
import { ReactComponent as DeleteSvg } from '../images/delete.svg';

const Editor: React.FC = () => {
  const { currentNote, addNote } = useNote();
  const [title, setTitle] = useState('');

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTitle(value);
  }

  const onAddNote = () => {
    addNote({ title, content: '' });
  }

  useEffect(() => {
    if (!currentNote) return;
    setTitle(currentNote.title);
  }, [currentNote])

  return (
    <Root>
      <EditorHeader>
        <input value={title} onChange={onTitleChange} />
      </EditorHeader>
      <EditorContent>{currentNote?.content}</EditorContent>
      <Footer>
        <div>
          <IconButton>
            <ClearSvg />
            <span>Clear</span>
          </IconButton>
        </div>
        <div>
          <IconButton onClick={onAddNote}>
            <SaveSvg />
            <span>Save</span>
          </IconButton>
          <IconButton>
            <DeleteSvg />
            <span>Delete</span>
          </IconButton>
        </div>
      </Footer>
    </Root>
  );
}

export default Editor;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorHeader = styled.div`
  width: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;

  & > input {
    width: 100%;
    height: 40px;
    padding: 0 1em;
    border: none;
    box-sizing: border-box;
  }
`
const EditorContent = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px solid #eee;
  padding: 0 10px;
  background-color: #f6f6f6;

  & > :first-child {
    flex-grow: 1;
  }
`

const IconButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
`