import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import { addLog, editNote } from '../redux/uiActions';
import styles from './Note.module.css';

import Handle from './Handle';

export default function Notes({ id, parentId, color, text }) {
  const background = color ?? '#ffffff';
  const style = { background };
  const [_, setTimer] = useState(null);
  const dis = useDispatch();

  const startPress = (e) => {
    dis(addLog('start'));
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return setTimeout(() => dis(editNote(id)), 500);
    });
  };

  const endPress = (e) => {
    dis(addLog('end'));
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return null;
    });
  };

  return (
    <div className={styles.note} style={style}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => dis(removeNote(id, parentId))}>
          x
        </button>
      </div>
      <div
        className={styles.text}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onMouseDown={startPress}
        onMouseUp={endPress}
      >
        {text}
      </div>
      <div className={styles.handle}>
        <Handle />
      </div>
    </div>
  );
}
