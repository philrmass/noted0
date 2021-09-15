import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import { removeNote } from '../redux/notesActions';
import { addLog, editNote } from '../redux/uiActions';
import styles from './Note.module.css';

import Handle from './Handle';

export default function Notes({ id, parentId, color, text }) {
  const background = color ?? '#ffffff';
  const style = { background };
  const [_, setTimer] = useState(null);
  const dis = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'Note',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), []);

  const onMove = (e) => {
    /*
    if (isDragging) {
      dis(addLog('move'));
      e.preventDefault();
    }
    */
  };

  const startPress = (e) => {
    /*
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return setTimeout(() => dis(editNote(id)), 500);
    });
    */
  };

  const endPress = (e) => {
    /*
    dis(addLog('end'));
    e.preventDefault();
    setTimer((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      return null;
    });
    */
  };

  return (
    <div ref={dragRef} className={styles.note} style={style}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => dis(removeNote(id, parentId))}>
          x
        </button>
      </div>
      <div
        className={styles.text}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchMove={onMove}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseMove={onMove}
      >
        {text}
        {isDragging ? ' [dragging]' : ''}
      </div>
      <div className={styles.handle}>
        <Handle />
      </div>
    </div>
  );
}

//??? drop on note
/*
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = ({ id, text, index, moveCard }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
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
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
			{text}
		</div>);
};
*/

//??? move note
/*
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
*/

//??? handle
/*
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    width: '20rem',
};
const handleStyle = {
    backgroundColor: 'green',
    width: '1rem',
    height: '1rem',
    display: 'inline-block',
    marginRight: '0.75rem',
    cursor: 'move',
};
export const BoxWithHandle = () => {
    const [{ opacity }, drag, preview] = useDrag(() => ({
        type: ItemTypes.BOX,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }));
    return (<div ref={preview} style={{ ...style, opacity }}>
			<div ref={drag} style={handleStyle}/>
			Drag me by the handle
		</div>);
};
*/
