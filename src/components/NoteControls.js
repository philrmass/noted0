import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

export default function NoteHandle({ parentId, id }) {
  const dis = useDispatch();

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        <svg viewBox='-50 -50 100 100'>
          <path d='M5 0 l16 -16 l-5 -5 l-16 16 l-16 -16 l-5 5 l16 16 l-16 16 l5 5 l16 -16 l16 16 l5 -5 l-16 -16' />
        </svg>
      </button>
    </div>
  );
}
