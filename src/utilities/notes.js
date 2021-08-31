import { v4 as uuidv4 } from 'uuid';

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
      color: '#ff8080',
      text: 'This is a note',
      id: uuids[0],
    },
    [uuids[1]]: {
      at,
      children: [],
      color: '#ffc080',
      text: 'Add a new note using the plus button in the bottom right',
      id: uuids[1],
    },
    [uuids[2]]: {
      at,
      children: [],
      color: '#ffff80',
      text: 'Long press on a note to edit it, or change its color',
      id: uuids[2],
    },
    [uuids[3]]: {
      at,
      children: [],
      color: '#c0ff80',
      text: 'Delete the note with the button on the left',
      id: uuids[3],
    },
    [uuids[4]]: {
      at,
      children: [...uuids.slice(5, 7)],
      color: '#80ff80',
      text: 'The icon on the bottom left of the note shows that it has child notes. Click the note to see them',
      id: uuids[4],
    },
    [uuids[5]]: {
      at,
      children: [],
      color: '#80ffc0',
      text: 'This is a child note of the note shown above',
      id: uuids[5],
    },
    [uuids[6]]: {
      at,
      children: [],
      color: '#80ffff',
      text: 'Press the back button in the top left to go back to the parent note',
      id: uuids[6],
    },
  };
}
