import { useDragLayer } from 'react-dnd';

import styles from './NoteDragLayer.module.css';

import NoteControls from './NoteControls';
import NoteText from './NoteText';

export default function NoteDragLayer() {
  const { isDragging, item, current, diff } = useDragLayer(
    monitor => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      current: monitor.getSourceClientOffset(),
      diff: monitor.getDifferenceFromInitialOffset(),
    }),
  );

  if (!isDragging) {
    return null;
  }

  const background = item.color ?? '#ffffff';
  const left = `${diff?.x ?? 0}px`;
  const top = `${current?.y ?? 0}px`;

  const noteStyle = {
    background,
    left,
    top,
  };

  return (
    <div className={styles.note} style={noteStyle}>
      <NoteControls />
      <NoteText id={item.id} text={item.text} />
    </div>
  );
}
