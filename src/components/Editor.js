import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editNote } from '../redux/uiActions';
import { updateNote } from '../redux/notesActions';
import styles from './Editor.module.css';

import Colors from './Colors';
import NoteHandle from './NoteHandle';

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
      <div className={styles.space} onClick={() => setShowColor(true)}></div>
      <div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => setShowColor(true)}
          >
            Color
          </button>
        </div>
        <div style={style} className={styles.note}>
          <div className={styles.noteButtons}>
          </div>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <NoteHandle />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => dis(editNote(null))}
          >
            Cancel
          </button>
          <button
            className={styles.button}
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
      <div className={styles.space} onClick={() => save()}></div>
    </main>
  );
}

export default Editor;
