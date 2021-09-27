import { v4 as uuidv4 } from 'uuid';
import { getColors } from './colors';

export function getEmptyNote(id = uuidv4()) {
  return {
    at: Date.now(),
    children: [],
    id,
    text: '',
  };
}

export function getNotesDefault() {
  const uuids = Array.from({ length: 7 }, () => uuidv4());
  const colors = getColors();
  const at = Date.now();

  return {
    'root': {
      at,
      children: [...uuids.slice(0, 5)],
      id: 'root',
    },
    [uuids[0]]: {
      at,
      children: [],
      color: colors[12],
      text: 'This is a note',
      id: uuids[0],
    },
    [uuids[1]]: {
      at,
      children: [],
      color: colors[7],
      text: 'Add a new note using the plus button in the bottom right',
      id: uuids[1],
    },
    [uuids[2]]: {
      at,
      children: [],
      color: colors[8],
      text: 'Long press on a note to edit it, or change its color',
      id: uuids[2],
    },
    [uuids[3]]: {
      at,
      children: [],
      color: colors[11],
      text: 'Delete the note with the button on the left',
      id: uuids[3],
    },
    [uuids[4]]: {
      at,
      children: [...uuids.slice(5, 7)],
      color: colors[15],
      text: 'The icon on the bottom left of the note shows that it has child notes. Click the note to see them',
      id: uuids[4],
    },
    [uuids[5]]: {
      at,
      children: [],
      color: colors[3],
      text: 'This is a child note of the note shown above',
      id: uuids[5],
    },
    [uuids[6]]: {
      at,
      children: [],
      color: colors[4],
      text: 'Press the back button in the top left to go back to the parent note',
      id: uuids[6],
    },
  };
}
