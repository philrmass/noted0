import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cln from 'classnames';

import { addNote, revertNote } from '../redux/notesActions';
import { clearNote, editNote } from '../redux/uiActions';
import styles from './Controls.module.css';

import Icon from './Icon';
import Menu from './Menu';
import SaveDialog from './SaveDialog';

function Controls() {
  const [isOpen, setIsOpen] = useState(false);
  const dis = useDispatch();
  const parentIds = useSelector(state => state.ui.parentIds);
  const parentId = parentIds[parentIds.length - 1] ?? 'root';
  const removedNote = useSelector(state => state.notes.removedNote);
  const isNotRoot = parentIds.length > 1;

  const add = () => {
    const addAction = addNote(parentId);
    dis(addAction);
    dis(editNote(addAction.id));
  };

  return (
    <>
      <button className={cln(styles.button, styles.menu)} onClick={() => setIsOpen(true)}>
        <Icon name='menu' />
      </button>
      <button className={cln(styles.button, styles.add)} onClick={() => add()}>
        <Icon name='plus' />
      </button>
      {removedNote &&
      <button className={cln(styles.button, styles.revert)} onClick={() => dis(revertNote())}>
        <Icon name='revert' />
      </button>
      }
      {isNotRoot &&
      <button className={cln(styles.button, styles.back)} onClick={() => dis(clearNote())}>
        <Icon name='back' />
      </button>
      }
      <Menu isOpen={isOpen} close={() => setIsOpen(false)} />
      <SaveDialog />
    </>
  );
}

export default Controls;
