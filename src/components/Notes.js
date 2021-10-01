import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editNote } from '../redux/uiActions';
import styles from './Notes.module.css';

import Note from './Note';

export default function Notes() {
  const dis = useDispatch();
  const allNotes = useSelector(state => state.notes.all);
  const parentIds = useSelector(state => state.ui.parentIds);
  const scrollId = useSelector(state => state.ui.scrollId);
  const scrollTop = useSelector(state => state.ui.scrollTop);
  const parentId = parentIds[parentIds.length - 1] ?? 'root';
  const parent = allNotes[parentId];
  const showParent = parent?.text && parent?.color;
  const ids = parent?.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  useEffect(() => {
    if (scrollId) {
      var element = document.getElementById(scrollId);
      element && element.scrollIntoView({ block: 'center' });
    }
  }, [scrollId]);

  useEffect(() => {
    if (scrollTop) {
      var element = document.getElementById(parentId);
      element && element.scrollIntoView({ block: 'center' });
    }
  }, [scrollTop]);

  const background = parent?.color ?? '#ffffff';
  const parentStyle = { background };

  const buildParent = () => {
    if (!showParent) {
      return <div className={styles.parentSpacer}></div>;
    }

    return (
      <li id={parentId} className={styles.parent} style={parentStyle}>
        <div className={styles.handle}></div>
        <div className={styles.text} onClick={() => dis(editNote(parentId))}>
          {parent?.text}
        </div>
        <div className={styles.handle}></div>
      </li>
    );
  };

  return (
    <ul className={styles.notes}>
      {buildParent()}
      
      {notes.map((note) => (
        <li id={note.id} key={note.id}>
          <Note parentId={parentId} note={note} />
        </li>
      ))}
    </ul>
  );
}
