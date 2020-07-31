import React from 'react';
import styled from 'styled-components';

import { useNote } from '../libs/noteContext';

const NoteList: React.FC = () => {
  const { notes, currentNote, viewNote, mode } = useNote();

  const onItemClick = (id: string) => {
    if(mode === 'edit' || mode === 'create') return;
    viewNote(id);
  };

  return (
    <div>
      {notes.map(note => {
        return (
          <Item
            key={note.id}
            active={mode !== 'create' && note.id === currentNote?.id}
            onClick={() => onItemClick(note.id)}
          >
            {note.title}
          </Item>
        )
      })}
    </div>
  );
};

export default NoteList;

const Item = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  margin: 3px 0;
  padding: 0 20px;
  border: none;
  background-color: ${({ active }) => active ? '#99baf8' : '#fff' };
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;