import styles from './Dialog.module.css';

export default function Dialog({ children, isOpen }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.background}>
      <div className={styles.dialog}>
        {children}
      </div>
    </div>
  );
}
