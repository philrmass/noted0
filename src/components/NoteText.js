import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editNote } from '../redux/uiActions';
import styles from './NoteText.module.css';

export default function NoteText({ id, text, setText }) {
  const [_, setTimer] = useState(null);
  const dis = useDispatch();
  const isEditing = Boolean(setText);
  const longPressMs = 500;

  const startPress = () => {
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return setTimeout(() => dis(editNote(id)), longPressMs);
    });
  };

  const endPress = (e) => {
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return null;
    });
  };

  if (isEditing) {
    return (
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    );
  }

  return (
    <div
      className={styles.text}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onMouseDown={startPress}
      onMouseUp={endPress}
    >
      {text}
    </div>
  );
}
