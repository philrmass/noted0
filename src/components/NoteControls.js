import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

//??? cursor: 'move',
export default function NoteHandle({ parentId, id }) {
  const dis = useDispatch();

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        x
      </button>
    </div>
  );
}
