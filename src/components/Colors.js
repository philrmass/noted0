import { useDispatch, useSelector } from 'react-redux';

import { getColors } from '../utilities/colors';
import { updateColor } from '../redux/notesActions';
import { removeOverlay } from '../redux/uiActions';
import styles from './Colors.module.css';

const colors = getColors();

function Colors() {
  const dis = useDispatch();
  const editingId = useSelector(state => state.ui.editingId);

  const save = (color) => {
    dis(updateColor(editingId, color));
    dis(removeOverlay('colors'));
  };

  const buildColors = () => (
    colors.map((color) => {
      const style = { background: color };

      return (
        <li
          key={color}
          style={style}
          className={styles.color}
          onClick={() => save(color)}
        >
          {color}
        </li>
      );
    })
  );

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <ul className={styles.colors}>
          {buildColors()}
        </ul>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => dis(removeOverlay('colors'))}
        >
          Cancel
        </button>
      </div>
    </main>
  );
}

export default Colors;
