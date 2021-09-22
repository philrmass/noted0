import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { editNote } from '../redux/uiActions';
import { updateNote } from '../redux/notesActions';
import styles from './Editor.module.css';

import Colors from './Colors';
import NoteControls from './NoteControls';
import NoteHandle from './NoteHandle';
import NoteText from './NoteText';

function Editor() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [showColor, setShowColor] = useState(false);
  const dis = useDispatch();
  const all = useSelector(state => state.notes.all);
  const editingId = useSelector(state => state.ui.editingId);
  const lastColor = useSelector(state => state.notes.lastColor);
  const style = { background: color };

  useEffect(() => {
    const note = all[editingId];
    const white = '#ffffff';

    setText(note?.text);
    setColor(note?.color ?? lastColor ?? white);
  }, [all, editingId]);

  const save = () => {
    dis(updateNote(editingId, text, color ));
    dis(editNote(null));
  };

  if (showColor) {
    return <Colors setColor={setColor} onClose={() => setShowColor(false)} />;
  }

  return (
    <main className={styles.main}>
      <button
        className={cln(styles.button, styles.color)}
        onClick={() => setShowColor(true)}
      >
        <svg viewBox='0 0 25.5 8.5'>
          <text x='0' y='8'>Color</text>
        </svg>
      </button>
      <div style={style} className={styles.note}>
        <NoteControls />
        <NoteText text={text} setText={setText} />
        <NoteHandle />
      </div>
      <button
        className={cln(styles.button, styles.cancel)}
        onClick={() => dis(editNote(null))}
      >
        <svg viewBox='0 0 31 8.5'>
          <text x='0' y='8'>Cancel</text>
        </svg>
      </button>
      <button
        className={cln(styles.button, styles.save)}
        onClick={save}
      >
        <svg viewBox='0 0 21.6 8.5'>
          <text x='0' y='8'>Save</text>
        </svg>
      </button>
    </main>
  );
}

export default Editor;
