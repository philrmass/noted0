import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveData, loadData } from '../utilities/files';
import { importNotes } from '../utilities/notes';
import { setNotes } from '../redux/notesActions';
import styles from './Menu.module.css';

export default function Menu({ close }) {
  const [status, setStatus] = useState('');
  const dis = useDispatch();
  const allNotes = useSelector(state => state.notes.all);

  const save = async () => {
    const count = Object.keys(allNotes).length - 1;
    const filePath = getSaveFilePath();

    await saveData(filePath, allNotes);
    setStatus(`Saved ${count} notes to ${filePath}`);
  };

  const load = async () => {
    const data = await loadData();
    const { notes, message } = importNotes(data);

    if (notes) {
      dis(setNotes(notes));
    }
    setStatus(message);
  };

  const copy = async () => {
    const count = Object.keys(allNotes).length - 1;
    const data = JSON.stringify(allNotes, null, 2);

    try {
      await navigator.clipboard.writeText(data);
      setStatus(`Copied ${count} notes to clipboard`);
    } catch (err) {
      setStatus(`Could not write to clipboard: ${err.message}`);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.menu}>
        <div className={styles.controls}>
          <button className={styles.button} onClick={save}>
            <svg viewBox='0 0 21.5 8.5'>
              <text x='0' y='8'>Save</text>
            </svg>
          </button>
          <button className={styles.button} onClick={load}>
            <svg viewBox='0 0 23 8.5'>
              <text x='0' y='8'>Load</text>
            </svg>
          </button>
          <button className={styles.button} onClick={copy}>
            <svg viewBox='0 0 24 10.5'>
              <text x='0' y='8'>Copy</text>
            </svg>
          </button>
          <div className={styles.status}>
            {status}
          </div>
        </div>
        <button className={styles.button} onClick={close}>
          <svg viewBox='0 0 25.5 8.5'>
            <text x='0' y='8'>Close</text>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function getSaveFilePath(at = Date.now()) {
  const when = new Date(at);
  const year = when.getFullYear();
  const month = `${when.getMonth() + 1}`.padStart(2, '0');
  const date = `${when.getDate()}`.padStart(2, '0');

  return `notes_${year}_${month}_${date}.json`;
}
