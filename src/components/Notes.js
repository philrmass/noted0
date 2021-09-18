import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Notes.module.css';

import DraggableNote from './DraggableNote';

export default function Notes() {
  const [gap, setGap] = useState(null);
  const allNotes = useSelector(state => state.notes.all);
  const parentId = useSelector(state => state.ui.parentId) ?? 'root';
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  return (
    <ul>
      {notes.map((note, index) => (
        <li key={note.id} className={styles.note}>
          {index === gap &&
          <div className={styles.gap}></div>
          }
          <DraggableNote index={index} parentId={parentId} note={note} setGap={setGap}/>
        </li>
      ))}
    </ul>
  );
}
