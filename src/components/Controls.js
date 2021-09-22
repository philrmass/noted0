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
      <div className={styles.test}>

        <div className={styles.testBox}>
          <div className={styles.testIcon}>
            <svg viewBox='0 0 50 50'>
              <path d='M0 0, h50 v20 h-10 v-10 h-30 v30 h30 v-10 h10 v20 h-50 v-50' />
            </svg>
          </div>
        </div>

        <div className={styles.testBox}>
          <div className={styles.testIcon}>
            <svg viewBox='0 0 1 1' style={{ display: 'block' }}>
              <use href='#yo' />
            </svg>
          </div>
        </div>

        <div className={styles.testBox}>
          <svg viewBox='0 0 50 50' className={styles.testIcon}>
            <path d='M0 0, h50 v20 h-10 v-10 h-30 v30 h30 v-10 h10 v20 h-50 v-50' />
          </svg>
        </div>

        <div className={styles.testBox}>
          <svg viewBox='0 0 1 1' className={styles.testIcon}>
            <use href='#yo' />
          </svg>
        </div>

      </div>

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
    </>
  );
}

export default Controls;
