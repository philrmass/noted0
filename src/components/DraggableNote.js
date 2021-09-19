import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import cln from 'classnames';

import { removeNote, moveNote } from '../redux/notesActions';
import styles from './Note.module.css';

import Handle from './Handle';

export default function Note({ parentId, id, color, text }) {
  const type = 'Note';
  const dis = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id, color, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), []);

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (item.id !== id) {
        dis(moveNote(parentId, item.id, id));
      }
    },
  });

  const contentClasses = cln({
    [styles.content]: true,
    [styles.hidden]: isDragging,
  });
  const noteClasses = cln({
    [styles.note]: true,
    [styles.dragging]: isDragging,
  });
  const background = color ?? '#ffffff';
  const noteStyle = { background };

  return (
    <div ref={drop} className={noteClasses} style={noteStyle}>
      <div className={contentClasses}>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => dis(removeNote(parentId, id))}>
            x
          </button>
        </div>
        <div
          className={styles.text}
        >
          {text}
        </div>
        <div ref={drag} className={styles.handle}>
          <Handle />
        </div>
      </div>
    </div>
  );
}
