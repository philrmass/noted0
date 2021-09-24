import { useSelector } from 'react-redux';

import Note from './Note';

export default function Notes() {
  const allNotes = useSelector(state => state.notes.all);
  const parentIds = useSelector(state => state.ui.parentIds);
  const parentId = parentIds[parentIds.length - 1] ?? 'root';
  const parent = allNotes[parentId];
  const ids = parent.children ?? [];
  const notes = ids.map((id) => allNotes[id]);

  //??? show parent note on top, grayed out, disabled, if it has text or color, then bottom padding
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Note parentId={parentId} id={note.id} color={note.color} text={note.text} />
        </li>
      ))}
    </ul>
  );
}
