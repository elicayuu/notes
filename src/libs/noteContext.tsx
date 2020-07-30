import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultNotes = [
  { id: '1', title: 'My first note', content: '# Markdown text 1' },
  { id: '2', title: 'My second note', content: '# Markdown text 2' },
  { id: '3', title: 'My third note', content: '# Markdown text 3' },
]

type NoteMode = 'view' | 'edit' | 'create';

type Note = {
  id: string;
  title: string;
  content: string;
}

type NoteData = {
  currentNote?: Note;
  mode: NoteMode;
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
  viewNote: (id: string) => void;
  changeNoteMode: (mode: NoteMode) => void;
}

const NoteContext = React.createContext<NoteData>({
  mode: 'view',
  notes: [],
  addNote: () => {},
  removeNote: () => {},
  updateNote: () => {},
  viewNote: () => {},
  changeNoteMode: () => {},
});

export const NoteProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<NoteMode>('view');
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [currentNote, setCurrentNote] = useState<Note>(notes[0]);

  const changeNoteMode = (mode: NoteMode) => {
    setMode(mode);
  }
  
  const addNote = (note: Omit<Note, 'id'>) => {
    const newNotes = [...notes];
    const id = uuidv4();
    const newNote = { ...note, id };
    newNotes.unshift(newNote);
    setNotes(newNotes);
    setCurrentNote(newNote);
    changeNoteMode('view');
  };

  const removeNote = (id: string) => {
    const index = notes.findIndex(note => note.id === id);
    const newNotes = notes.filter(note => note.id !== id);
    const nextIndex = index === 0 ? 0 : index - 1;
    const nextNote = newNotes[nextIndex];
    setNotes(newNotes);
    setCurrentNote(nextNote);
    changeNoteMode('view');
  };

  const updateNote = (newNote: Note) => {
    const newNotes = [...notes];
    const index = newNotes.findIndex(note => note.id === newNote.id);
    newNotes.splice(index, 1, newNote);
    setNotes(newNotes);
    setCurrentNote(newNote);
    changeNoteMode('view');
  };

  const viewNote = (id: string) => {
    const targetNote = notes.find(note => note.id === id);
    if (!targetNote) return;
    setCurrentNote(targetNote);
  }
  
  const contextData = {
    currentNote,
    mode,
    notes,
    addNote,
    removeNote,
    updateNote,
    viewNote,
    changeNoteMode
  };

  return (
    <NoteContext.Provider value={contextData}>
      {children}
    </NoteContext.Provider>
  )
}

export const useNote = () => {
  return useContext(NoteContext);
};