import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote, revertNote } from '../redux/notesActions';
import { clearNote, editNote } from '../redux/uiActions';
import styles from './Controls.module.css';

import Icon from './Icon';

function Controls() {
  const dis = useDispatch();
  const parentIds = useSelector(state => state.ui.parentIds);
  const parentId = parentIds[parentIds.length - 1] ?? 'root';
  const removedNote = useSelector(state => state.notes.removedNote);
  const isNotRoot = parentIds.length > 1;

  const add = () => {
    const addAction = addNote(parentId);
    dis(addAction);
    dis(editNote(addAction.id));
  };

  return (
    <>
      <div className={styles.iconTest}>
        <svg viewBox='0 0 1 1' className={styles.icon}>
          <svg id="back" viewBox="0 0 100 100">
            <path d="M53 53 v14 h-6 v-14 h-14 v-6 h14 v-14 h6 v14 h14 v6 h-14" />
          </svg>
        </svg>
      </div>
      <button className={cln(styles.button, styles.add)} onClick={() => add()}>
        <Icon name='plus' />
      </button>
      {removedNote &&
      <button className={cln(styles.button, styles.revert)} onClick={() => dis(revertNote())}>
        R
      </button>
      }
      {isNotRoot &&
      <button className={cln(styles.button, styles.back)} onClick={() => dis(clearNote())}>
        B
      </button>
      }
    </>
  );
}

export default Controls;
