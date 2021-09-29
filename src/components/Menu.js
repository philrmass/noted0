import { useSelector } from 'react-redux';

//import { saveData, loadData } from '../utilities/files';
import styles from './Menu.module.css';

//??? navigator.share(data)

export default function Menu({ close }) {
  const allNotes = useSelector(state => state.notes.all);

  const save = () => {
    //??? getFilePath
    //saveData(allNotes);
    console.warn('SAVE');
  };

  const load = () => {
    //await loadData();
    // validate
    // setNotes
    console.warn('LOAD');
  };

  const share = () => {
    navigator.share && navigator.share(allNotes);
  };

  return (
    <div className={styles.background}>
      <div className={styles.menu}>
        <div className={styles.buttons}>
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
          <button className={styles.button} onClick={share}>
            <svg viewBox='0 0 27 8.5'>
              <text x='0' y='8'>Share</text>
            </svg>
          </button>
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
