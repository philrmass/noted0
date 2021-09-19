import { useSelector } from 'react-redux';

import styles from './Notes.module.css';

import Note from './Note';

export default function Notes() {
  const allNotes = useSelector(state => state.notes.all);
  const parentId = useSelector(state => state.ui.parentId);
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} className={styles.note}>
          <Note parentId={parentId} id={note.id} color={note.color} text={note.text} />
        </li>
      ))}
    </ul>
  );
}
