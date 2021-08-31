import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote } from '../redux/notesActions';
import { editNote } from '../redux/uiActions';
import styles from './Controls.module.css';

function Controls({ children }) {
  const dis = useDispatch();
  const parentId = useSelector(state => state.notes.parentId);

  const add = () => {
    const addAction = addNote(parentId);
    dis(addAction);
    dis(editNote(addAction.id));
  };

  return (
    <>
      {children}
      <button
        className={cln(styles.button, styles.add)}
        onClick={() => add()}
      >
        +
      </button>
    </>
  );
}

export default Controls;
