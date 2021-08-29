import { useSelector } from 'react-redux';

import styles from './Notes.module.css';

import Handle from './Handle';

function Notes() {
  const allNotes = useSelector(state => state.notes.all);
  const parentId = useSelector(state => state.notes.parentId) ?? 'root';
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  const buildNote = (note) => {
    const color = note.color ?? '#ffffff';
    const style = { background: color };

    return (
      <li
        key={note.uuid}
        style={style}
        className={styles.note}
      >
        <div className={styles.buttons}>
        </div>
        <div className={styles.text}>
          {note.text}
        </div>
        <Handle />
      </li>
    );
  };

  return (
    <ul>
      {notes.map(note => buildNote(note))}
    </ul>
  );
}

export default Notes;
