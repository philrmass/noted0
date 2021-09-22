import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

export default function NoteHandle({ parentId, id }) {
  const dis = useDispatch();
  const hasChildren = Boolean(Number(id && id.slice(-1))); //??? fix

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        <svg viewBox='-50 -50 100 100'>
          <path d='M5 0 l16 -16 l-5 -5 l-16 16 l-16 -16 l-5 5 l16 16 l-16 16 l5 5 l16 -16 l16 16 l5 -5 l-16 -16' />
        </svg>
      </button>
      {hasChildren &&
      <div className={styles.icon}>
        <svg viewBox='0 0 100 100'>
          <path d='M10 25 h80 v6 h-50 l5 10 h45 v6 h-42 l5 10 h37 v6 h-40.8 l-16 -32 h-23.2 v-6' />
        </svg>
      </div>
      }
    </div>
  );
}
