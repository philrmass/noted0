import { useSelector } from 'react-redux';

//import { editNote } from '../redux/uiActions';
import styles from './Editor.module.css';
//??? add save and cancel

function Editor() {
  const editingId = useSelector(state => state.ui.editingId);
  console.warn('EDITOR', editingId);
  //dis(editNote(null));

  return (
    <main className={styles.main}>
      EDITOR
      {editingId}
    </main>
  );
}

export default Editor;
