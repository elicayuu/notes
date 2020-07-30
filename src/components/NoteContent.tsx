import React from 'react';
import MarkdownViewer from './MarkdownViewer';
import Editor from './Editor';

import { useNote } from '../libs/noteContext';

const NoteContent: React.FC = () => {
  const { mode } = useNote();

  if (mode === 'edit') return <Editor />;

  return <MarkdownViewer />
}

export default NoteContent;