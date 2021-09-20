import styles from './NoteHandle.module.css';

export default function NoteHandle() {
  const indices = [...Array(12).keys()];

  return (
    <div className={styles.handle}>
      {indices.map((index) => (
        <div key={index} className={styles.box}>
          <div className={styles.dot}></div>
        </div>
      ))}
    </div>
  );
}
