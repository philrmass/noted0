import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

import Icon from './Icon';

export default function NoteHandle({ parentId, id }) {
  const dis = useDispatch();
  const hasChildren = Boolean(Number(id && id.slice(-1))); //??? fix

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        <Icon name='cross' />
      </button>
      {hasChildren &&
      <div className={styles.icon}>
        <Icon name='children' />
      </div>
      }
    </div>
  );
}
