import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import { editNote } from '../redux/uiActions';
import styles from './Notes.module.css';

import Handle from './Handle';

function Notes() {
  const [start, setStart] = useState(null);
  const dis = useDispatch();
  const allNotes = useSelector(state => state.notes.all);
  const parentId = useSelector(state => state.ui.parentId) ?? 'root';
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  const startPress = (e) => {
    e.preventDefault();
    setStart(Date.now());
  };

  const endPress = (e, id) => {
    e.preventDefault();
    if (start) {
      const duration = Date.now() - start;
      if (duration > 500) {
        dis(editNote(id));
      }
      setStart(null);
    }
  };

  const buildNote = (note) => {
    const color = note.color ?? '#ffffff';
    const style = { background: color };

    return (
      <li
        key={note.id}
        style={style}
        className={styles.note}
      >
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => dis(removeNote(note.id, parentId))}>
            x
          </button>
        </div>
        <div
          className={styles.text}
          onTouchStart={startPress}
          onTouchEnd={(e) => endPress(e, note.id)}
          onMouseDown={startPress}
          onMouseUp={(e) => endPress(e, note.id)}
        >
          {note.text}
        </div>
        <div className={styles.handle}>
          <Handle />
        </div>
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
