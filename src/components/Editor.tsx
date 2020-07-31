import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNote } from '../libs/noteContext';

import { ReactComponent as ClearSvg } from '../images/clear.svg';
import { ReactComponent as SaveSvg } from '../images/save.svg';
import { ReactComponent as DeleteSvg } from '../images/delete.svg';

const Editor: React.FC = () => {
  const { mode, currentNote, updateNote, addNote, changeNoteMode, removeNote, isLoading } = useNote();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setTitle(value);
  };

  const onContentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  const onSaveNote = () => {
    if (!currentNote) return;

    if (mode === 'create') {
      addNote({ title, content });
    } else {
      updateNote({ id: currentNote.id, title, content });
    }
  };

  const onDeleteNote = () => {
    if (!currentNote) return;

    if (mode === 'create') {
      changeNoteMode('view');
    } else {
      removeNote(currentNote.id);
    }
  };

  const onCancel = () => {
    changeNoteMode('view');
  };

  useEffect(() => {
    if (!currentNote || mode === 'create') return;
    setTitle(currentNote.title);
    setContent(currentNote.content);
  }, [currentNote, mode]);

  return (
    <Root>
      <EditorHeader>
        <input value={title} onChange={onTitleChange} />
      </EditorHeader>
      <Content>
        {isLoading && <Saving>Saving...</Saving>}
        <EditorContent value={content} onChange={onContentChange}></EditorContent>
      </Content>
      <Footer>
        <div>
          <IconButton type="button" onClick={onCancel} disabled={isLoading}>
            <ClearSvg />
            <span>Cancel</span>
          </IconButton>
        </div>
        <div>
          <IconButton type="button" onClick={onSaveNote} disabled={isLoading}>
            <SaveSvg />
            <span>Save</span>
          </IconButton>
          <IconButton type="button" onClick={onDeleteNote} disabled={isLoading}>
            <DeleteSvg />
            <span>Delete</span>
          </IconButton>
        </div>
      </Footer>
    </Root>
  );
};

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
`;

const Content = styled.div`
  position: relative;
  flex-grow: 1;
`;

const EditorContent = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;

const Saving = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  color: #666;
  font-size: 2em;
  font-weight: bold;
`;

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
`;

const IconButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;

  &[disabled] {
    color: #999;
    fill: currentColor;
  }
`;