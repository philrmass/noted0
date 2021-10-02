import { useDispatch, useSelector } from 'react-redux';

import { saveData } from '../utilities/files';
import { getSaveFilePath } from '../utilities/notes';
import { closeSaveDialog } from '../redux/notesActions';
import styles from './SaveDialog.module.css';

import BigButton from './BigButton';
import Dialog from './Dialog';

export default function SaveDialog() {
  const dis = useDispatch();
  const isOpen = useSelector(state => state.notes.saveDialogIsOpen);
  const allNotes = useSelector(state => state.notes.all);

  const save = async () => {
    const filePath = getSaveFilePath();

    await saveData(filePath, allNotes);
    dis(closeSaveDialog());
  };

  return (
    <Dialog isOpen={isOpen}>
      <div className={styles.controls}>
        <div className={styles.text}>
          Would you like to save a backup of your notes?
        </div>
        <BigButton text='Save' onClick={save} />
        <BigButton text='Cancel' onClick={() => dis(closeSaveDialog())} />
      </div>
    </Dialog>
  );
}
