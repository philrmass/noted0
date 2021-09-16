import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { removeNote } from '../redux/notesActions';
import styles from './Note.module.css';

import Handle from './Handle';

export default function DraggableNote({ index, parentId, note }) {
  const dis = useDispatch();
  const background = note.color ?? '#ffffff';
  const style = { background };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Note',
    item: {
      index,
      id: note.id,
      color: note.color,
      text: note.text,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), []);

  const [, drop] = useDrop({
    accept: 'Note',
    drop(item) {
      console.warn('drop', item.id.slice(0, 4), 'on', note.id.slice(0, 4));
    },
    hover(item/*, monitor*/) {
      /*
      if (item.id === note.id) {
        return;
      }
      */

      console.log(`[${index}] (${note.id.slice(0, 4)}) -> [${item.index}]`);

      //const clientOffset = monitor.getClientOffset();
      //??? restore, set index for space
      /*
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      */

      //moveCard(item.id);
      //item.index = hoverIndex;
    },
  });

  return (
    <div ref={drop} className={styles.note} style={style}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => dis(removeNote(note.id, parentId))}>
          x
        </button>
      </div>
      <div
        className={styles.text}
      >
        {note.text}
        {isDragging ? ` [dragging ${note.id.slice(0, 4)}]` : ''}
      </div>
      <div ref={drag} className={styles.handle}>
        <Handle />
      </div>
    </div>
  );
}
