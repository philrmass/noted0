import { getColors } from '../utilities/colors';
import styles from './Colors.module.css';

const colors = getColors();

function Colors({ setColor, onClose }) {
  const buildColors = () => (
    colors.map((color) => {
      const style = { background: color };

      const pickColor = (color) => {
        setColor(color);
        onClose();
      };

      return (
        <li
          key={color}
          className={styles.color}
          style={style}
          onClick={() => pickColor(color)}
        >
        </li>
      );
    })
  );

  return (
    <main className={styles.main}>
      <ul className={styles.colors}>
        {buildColors()}
      </ul>
      <button className={styles.button} onClick={onClose}>
        <svg viewBox='0 0 31 8.5'>
          <text x='0' y='8'>Cancel</text>
        </svg>
      </button>
    </main>
  );
}

export default Colors;
