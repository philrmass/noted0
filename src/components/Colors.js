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
          style={style}
          className={styles.color}
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
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </main>
  );
}

export default Colors;
