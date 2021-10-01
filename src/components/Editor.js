import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editNote } from '../redux/uiActions';
import { updateNote } from '../redux/notesActions';
import styles from './Editor.module.css';

import BigButton from './BigButton';
import Colors from './Colors';
import NoteControls from './NoteControls';
import NoteHandle from './NoteHandle';
import NoteText from './NoteText';

export default function Editor() {
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
      <div className={styles.top}>
        <BigButton text='Color' classes={styles.color} onClick={() => setShowColor(true)} />
      </div>
      <div style={style} className={styles.note}>
        <NoteControls />
        <NoteText text={text} setText={setText} />
        <NoteHandle />
      </div>
      <div className={styles.bottom}>
        <BigButton text='Cancel' classes={styles.cancel} onClick={() => dis(editNote(null))} />
        <BigButton text='Save' classes={styles.save} onClick={save} />
      </div>
    </main>
  );
}
