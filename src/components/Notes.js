import { useSelector } from 'react-redux';

import styles from './Notes.module.css';

import DraggableNote from './DraggableNote';

export default function Notes() {
  const allNotes = useSelector(state => state.notes.all);
  const parentId = useSelector(state => state.ui.parentId) ?? 'root';
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  return (
    <ul>
      {notes.map((note, index) => (
        <li key={note.id} className={styles.note}>
          <DraggableNote index={index} parentId={parentId} note={note} />
        </li>
      ))}
    </ul>
  );
}
