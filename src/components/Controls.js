import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote, revertNote } from '../redux/notesActions';
import { editNote } from '../redux/uiActions';
import styles from './Controls.module.css';

function Controls() {
  const dis = useDispatch();
  const parentId = useSelector(state => state.ui.parentId);
  const removedNote = useSelector(state => state.notes.removedNote);

  const add = () => {
    const addAction = addNote(parentId);
    dis(addAction);
    dis(editNote(addAction.id));
  };

  return (
    <>
      <button
        className={cln(styles.button, styles.add)}
        onClick={() => add()}
      >
        <svg viewBox='-50 -50 100 100'>
          <path d='M3 3 v14 h-6 v-14 h-14 v-6 h14 v-14 h6 v14 h14 v6 h-14' />
        </svg>
      </button>
      {removedNote &&
      <button
        className={cln(styles.button, styles.revert)}
        onClick={() => dis(revertNote())}
      >
        R
      </button>
      }
      {/*
      <div className={styles.big}>
        <svg viewBox='-50 -50 100 100'>
          <path d='M5 0 l16 -16 l-5 -5 l-16 16 l-16 -16 l-5 5 l16 16 l-16 16 l5 5 l16 -16 l16 16 l5 -5 l-16 -16' />
        </svg>
      </div>
      */}
    </>
  );
}

export default Controls;
