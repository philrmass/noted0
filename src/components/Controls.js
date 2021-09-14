import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote, revertNote } from '../redux/notesActions';
import { editNote } from '../redux/uiActions';
import styles from './Controls.module.css';

function Controls() {
  const dis = useDispatch();
  const parentId = useSelector(state => state.ui.parentId);
  const removedNote = useSelector(state => state.notes.removedNote);
  const logs = useSelector(state => state.ui.logs);

  const add = () => {
    const addAction = addNote(parentId);
    dis(addAction);
    dis(editNote(addAction.id));
  };

  return (
    <>
      <div className={styles.logs}>
        {logs.reduce((all, log) => `${all}${log}\n`, '')}
      </div>
      <button
        className={cln(styles.button, styles.add)}
        onClick={() => add()}
      >
        +
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
