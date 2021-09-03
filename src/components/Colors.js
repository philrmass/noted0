import { useDispatch, useSelector } from 'react-redux';

import { updateColor } from '../redux/notesActions';
import { removeOverlay } from '../redux/uiActions';
import styles from './Colors.module.css';

function Colors() {
  const dis = useDispatch();
  const editingId = useSelector(state => state.ui.editingId);
  const colors = [
    '#f00000',
    '#f08000',
    '#f0f000',
    '#80f000',
  ];

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
