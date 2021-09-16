import { useDragLayer } from 'react-dnd';

import styles from './DragLayer.module.css';

export default function DragLayer() {
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

  const background = item.color;
  const left = `${diff?.x ?? 0}px`;
  const top = `${current?.y ?? 0}px`;

  const style = {
    background,
    left,
    top,
  };

  //??? add real note
  return (
    <div className={styles.main} style={style}>
      <div>PREVIEW</div>
      <div>{`${item.id.slice(0, 4)}`}</div>
      <div>{item.text}</div>
    </div>
  );
}
