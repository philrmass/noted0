import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import cln from 'classnames';

import { moveNote } from '../redux/notesActions';
import styles from './Note.module.css';

import NoteControls from './NoteControls';
import NoteHandle from './NoteHandle';
import NoteText from './NoteText';

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

  const noteClasses = cln({
    [styles.note]: true,
    [styles.noteDragging]: isDragging,
  });
  const contentClasses = cln({
    [styles.content]: true,
    [styles.contenDragging]: isDragging,
  });
  const background = color ?? '#ffffff';
  const noteStyle = { background };

  return (
    <div ref={drop} className={noteClasses} style={noteStyle}>
      <div className={contentClasses}>
        <NoteControls parentId={parentId} id={id} />
        <NoteText id={id} text={text} />
        <div ref={drag}>
          <NoteHandle />
        </div>
      </div>
    </div>
  );
}
