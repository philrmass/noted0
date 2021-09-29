import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editNote, selectNote } from '../redux/uiActions';
import styles from './NoteText.module.css';

export default function NoteText({ id, text, setText }) {
  const [start, setStart] = useState(0);
  const [_, setTimer] = useState(null);
  const [y, setY] = useState(null);
  const [moveY, setMoveY] = useState(0);
  const dis = useDispatch();
  const isEditing = Boolean(setText);
  const shortPressMs = 200;
  const longPressMs = 500;
  const moveMax = 40;

  const handleStart = (e) => {
    const ey = e.clientY ?? e.touches[0].clientY;

    setStart(Date.now());
    setY(ey);
    setMoveY(0);
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return setTimeout(() => dis(editNote(id)), longPressMs);
    });
  };

  const handleEnd = (e) => {
    const time = Date.now() - start;

    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return null;
    });

    if (time < shortPressMs && moveY <= moveMax) {
      setTimeout(() => dis(selectNote(id)), 0);
    }
  };

  const handleMove = (e) => {
    const ey = e.clientY ?? e.touches[0].clientY;
    const dy = Math.abs(ey - y);
    setMoveY(dy);

    if (dy > moveMax) {
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
        autoFocus
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
