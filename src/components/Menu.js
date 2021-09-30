import { useState } from 'react';
import { useSelector } from 'react-redux';

import { saveData/*, loadData*/ } from '../utilities/files';
import styles from './Menu.module.css';

//??? navigator.share(data)

export default function Menu({ close }) {
  const [status, setStatus] = useState('');
  const allNotes = useSelector(state => state.notes.all);

  const save = async () => {
    const count = Object.keys(allNotes).length - 1;
    const filePath = getSaveFilePath();

    await saveData(filePath, allNotes);
    setStatus(`${count} notes saved to ${filePath}`);
  };

  const load = () => {
    //await loadData();
    // validate
    // setNotes
    setStatus('LOAD');
  };

  const copy = () => {
    //??? copy notes JSON.stringify to buffer
    setStatus('COPY');
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
