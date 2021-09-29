import { useDispatch } from 'react-redux';

import { removeNote } from '../redux/notesActions';
import styles from './NoteControls.module.css';

import Icon from './Icon';

export default function NoteHandle({ parentId, id, childCount }) {
  const dis = useDispatch();

  const buildChildren = () => {
    if (!childCount) {
      return <div></div>;
    }

    return <div className={styles.count}>{childCount}</div>;
  };

  return (
    <div className={styles.controls}>
      <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
        <Icon name='cross' />
      </button>
      <div className={styles.icon}>
        {buildChildren()} 
      </div>
    </div>
  );
}
