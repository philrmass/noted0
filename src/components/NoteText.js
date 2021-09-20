import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editNote } from '../redux/uiActions';
import styles from './NoteText.module.css';

export default function NoteText({ id, text, setText }) {
  const [_, setTimer] = useState(null);
  const [y, setY] = useState(null);
  const dis = useDispatch();
  const isEditing = Boolean(setText);
  const longPressMs = 500;

  const handleStart = (e) => {
    const ey = e.clientY ?? e.touches[0].clientY;
    setY(ey);
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return setTimeout(() => dis(editNote(id)), longPressMs);
    });
  };

  const handleEnd = (e) => {
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return null;
    });
  };

  const handleMove = (e) => {
    const ey = e.clientY ?? e.touches[0].clientY;
    const moveY = Math.abs(ey - y);
    const moveMin = 50;

    if (moveY > moveMin) {
      setTimer((timerId) => {
        if (timerId) {
          clearTimeout(timerId);
        }
        return null;
      });
    }
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
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleMove}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseMove={handleMove}
    >
      {text}
    </div>
  );
}
