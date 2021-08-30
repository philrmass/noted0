import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote } from '../redux/notesActions';
import styles from './Controls.module.css';

function Controls({ children }) {
  const dis = useDispatch();
  const parentId = useSelector(state => state.notes.parentId);

  return (
    <>
      {children}
      <button
        className={cln(styles.button, styles.add)}
        onClick={() => dis(addNote(parentId))}
      >
        +
      </button>
    </>
  );
}

export default Controls;
