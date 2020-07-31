import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { encrypt, decrypt } from './encrypt';

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
  isLoading: boolean;
  addNote: (note: Omit<Note, 'id'>) => void;
  removeNote: (id: string) => void;
  updateNote: (note: Note) => void;
  viewNote: (id: string) => Promise<void>;
  changeNoteMode: (mode: NoteMode) => void;
}

const NoteContext = React.createContext<NoteData>({
  mode: 'view',
  notes: [],
  isLoading: true,
  addNote: () => {},
  removeNote: () => {},
  updateNote: () => Promise.resolve(),
  viewNote: () => Promise.resolve(),
  changeNoteMode: () => {},
});

export const NoteProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<NoteMode>('view');
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [currentNote, setCurrentNote] = useState<Note>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const initialNoteRef = useRef(notes[0]);

  const encryptNote = useCallback(async (note: Note): Promise<Note> => {
    const { content } = note;
    setIsLoading(true);
    const encryptedContent: string = await encrypt(content);
    setIsLoading(false);
    return { ...note, content: encryptedContent };
  }, []);

  const decryptNote = useCallback(async (note?: Note) => {
    if (!note) return;
    const { content } = note;
    setIsLoading(true);
    setCurrentNote({ ...note, content: '' });
    const decryptedContent = await decrypt(content);
    setCurrentNote({ ...note, content: decryptedContent });
    setIsLoading(false);
  }, []);

  const changeNoteMode = useCallback((mode: NoteMode) => {
    setMode(mode);
  }, []);
  
  const addNote = useCallback(async (note: Omit<Note, 'id'>) => {
    const newNotes = [...notes];
    const id = uuidv4();
    const newNote = { ...note, id };
    const encryptedNote = await encryptNote(newNote);
    newNotes.unshift(encryptedNote);
    setNotes(newNotes);
    setCurrentNote(newNote);
    changeNoteMode('view');
  }, [notes, encryptNote, changeNoteMode]);

  const removeNote = useCallback((id: string) => {
    const index = notes.findIndex(note => note.id === id);
    const newNotes = notes.filter(note => note.id !== id);
    const nextIndex = index === 0 ? 0 : index - 1;
    const nextNote = newNotes[nextIndex];
    setNotes(newNotes);
    setCurrentNote(nextNote);
    changeNoteMode('view');
  }, [notes, changeNoteMode]);

  const updateNote = useCallback(async (newNote: Note) => {
    const newNotes = [...notes];
    const index = newNotes.findIndex(note => note.id === newNote.id);
    const encryptedNote = await encryptNote(newNote);
    newNotes.splice(index, 1, encryptedNote);
    setNotes(newNotes);
    setCurrentNote(newNote);
    changeNoteMode('view');
  }, [notes, encryptNote, changeNoteMode]);

  const viewNote = useCallback(async (id: string) => {
    const targetNote = notes.find(note => note.id === id);
    decryptNote(targetNote);
  }, [notes, decryptNote]);
  
  const contextData = {
    currentNote,
    mode,
    notes,
    isLoading,
    addNote,
    removeNote,
    updateNote,
    viewNote,
    changeNoteMode
  };

  useEffect(() => {
    decryptNote(initialNoteRef.current);
  }, [initialNoteRef, decryptNote]);

  return (
    <NoteContext.Provider value={contextData}>
      {children}
    </NoteContext.Provider>
  )
}

export const useNote = () => {
  return useContext(NoteContext);
};