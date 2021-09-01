import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editNote } from '../redux/uiActions';
import { updateNote } from '../redux/notesActions';
import styles from './Editor.module.css';

import Handle from './Handle';

function Editor() {
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  const dis = useDispatch();
  const all = useSelector(state => state.notes.all);
  const editingId = useSelector(state => state.ui.editingId);
  const background = color ?? '#ffffff';
  const style = { background };

  useEffect(() => {
    const note = all[editingId];
    setColor(note?.color);
    setText(note?.text);
  }, [all, editingId]);

  const save = () => {
    dis(updateNote(editingId, text, color));
    dis(editNote(null));
  };

  return (
    <main className={styles.main}>
      <div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => console.warn('OPEN-COLOR')}
          >
            Color
          </button>
        </div>
        <div style={style} className={styles.note}>
          <div className={styles.noteButtons}>
          </div>
          <div className={styles.text}>
            {text}
            {/*
            <textarea>
            </textarea>
            */}
          </div>
          <Handle />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={save}
          >
            Save
          </button>
          <button
            className={styles.button}
            onClick={() => dis(editNote(null))}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}

export default Editor;
