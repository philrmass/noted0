import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addOverlay, editNote } from '../redux/uiActions';
import { updateText } from '../redux/notesActions';
import styles from './Editor.module.css';

import Handle from './Handle';

function Editor() {
  const [text, setText] = useState('');
  const dis = useDispatch();
  const all = useSelector(state => state.notes.all);
  const editingId = useSelector(state => state.ui.editingId);
  const color = all[editingId]?.color;
  const background = color ?? '#ffffff';
  const style = { background };

  useEffect(() => {
    const note = all[editingId];
    setText(note?.text);
  }, [all, editingId]);

  const save = () => {
    dis(updateText(editingId, text ));
    dis(editNote(null));
  };

  return (
    <main className={styles.main}>
      <div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => dis(addOverlay('colors'))}
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
