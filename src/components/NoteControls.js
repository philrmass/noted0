import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

import Icon from './Icon';

export default function NoteHandle({ parentId, id, hasChildren }) {
  const dis = useDispatch();
  const iconName = hasChildren ? 'children' : 'blank';

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        <Icon name='cross' />
      </button>
      <div className={styles.icon}>
        <Icon name={iconName} />
      </div>
    </div>
  );
}
