import { v4 as uuidv4 } from 'uuid';

export function getEmptyNote() {
  return {
    at: Date.now(),
    children: [],
    text: '',
    uuid: uuidv4(),
  };
}

export function getNotesDefault() {
  const uuids = Array.from({ length: 7 }, () => uuidv4());
  const at = Date.now();

  return {
    'root': {
      at,
      children: [...uuids.slice(0, 5)],
      uuid: 'root',
    },
    [uuids[0]]: {
      at,
      children: [],
      color: '#ff8080',
      text: 'This is a note',
      uuid: uuids[0],
    },
    [uuids[1]]: {
      at,
      children: [],
      color: '#ffc080',
      text: 'Add a new note using the plus button in the bottom right',
      uuid: uuids[1],
    },
    [uuids[2]]: {
      at,
      children: [],
      color: '#ffff80',
      text: 'Long press on a note to edit it, or change its color',
      uuid: uuids[2],
    },
    [uuids[3]]: {
      at,
      children: [],
      color: '#c0ff80',
      text: 'Delete the note with the button on the left',
      uuid: uuids[3],
    },
    [uuids[4]]: {
      at,
      children: [...uuids.slice(5, 7)],
      color: '#80ff80',
      text: 'The icon on the bottom left of the note shows that it has child notes. Click the note to see them',
      uuid: uuids[4],
    },
    [uuids[5]]: {
      at,
      children: [],
      color: '#80ffc0',
      text: 'This is a child note of the note shown above',
      uuid: uuids[5],
    },
    [uuids[6]]: {
      at,
      children: [],
      color: '#80ffff',
      text: 'Press the back button in the top left to go back to the parent note',
      uuid: uuids[6],
    },
  };
}
