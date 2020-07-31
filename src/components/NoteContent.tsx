import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import Editor from './Editor';

import { useNote } from '../libs/noteContext';

const NoteContent: React.FC = () => {
  const { mode, notes } = useNote();

  if (notes.length === 0 && mode === 'view') return null;

  if (mode === 'edit' || mode === 'create') return <Editor />;

  return <MarkdownViewer />
};

export default NoteContent;