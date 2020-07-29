import React from 'react';
import styled from 'styled-components';

import { useNote } from '../libs/noteContext';

const NoteList: React.FC = () => {
  const { notes, currentNote, viewNote } = useNote();

  return (
    <Root>
      {notes.map(note => {
        return (
          <Item
            key={note.id}
            active={note.id === currentNote?.id}
            onClick={() => viewNote(note.id)}
          >
            {note.title}
          </Item>
        )
      })}
    </Root>
  );
}

export default NoteList;

const Root = styled.div`

`;

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
`