import { useSelector } from 'react-redux';

import styles from './Notes.module.css';

import Note from './Note';

export default function Notes() {
  const allNotes = useSelector(state => state.notes.all);
  const parentIds = useSelector(state => state.ui.parentIds);
  const parentId = parentIds[parentIds.length - 1] ?? 'root';
  const parent = allNotes[parentId];
  const showParent = parent?.text && parent?.color;
  const ids = parent?.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  const background = parent?.color ?? '#ffffff';
  const parentStyle = { background };

  return (
    <ul className={styles.notes}>
      {showParent &&
      <div className={styles.parent} style={parentStyle}>
        <div className={styles.handle}></div>
        <div className={styles.text}>{parent?.text}</div>
        <div className={styles.handle}></div>
      </div>
      }
      {notes.map((note) => (
        <li key={note.id}>
          <Note parentId={parentId} note={note} />
        </li>
      ))}
    </ul>
  );
}
