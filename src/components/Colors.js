import cln from 'classnames';

import { getColors } from '../utilities/colors';
import styles from './Colors.module.css';

const colors = getColors();

function Colors({ current, setColor, onClose }) {
  const pickColor = (color) => {
    setColor(color);
    onClose();
  };

  const buildColors = () => (
    colors.map((color) => {
      const isCurrent = color === current;
      const colorClasses = cln({
        [styles.color]: true,
        [styles.current]: isCurrent,
      });
      const style = { background: color };

      return (
        <li
          key={color}
          className={colorClasses}
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
