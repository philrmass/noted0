import { v4 as uuidv4 } from 'uuid';

import {
  ADD_NOTE,
  MOVE_NOTE,
  REMOVE_NOTE,
  REVERT_NOTE,
  UPDATE_NOTE,
} from './constants';

export function addNote(parentId) {
  const id = uuidv4();
  return { type: ADD_NOTE, id, parentId };
}

export function moveNote(parentId, fromId, toId) {
  return { type: MOVE_NOTE, parentId, fromId, toId };
}

export function removeNote(id, parentId) {
  return { type: REMOVE_NOTE, id, parentId };
}

export function revertNote() {
  return { type: REVERT_NOTE };
}

export function updateNote(id, text, color) {
  return { type: UPDATE_NOTE, id, text, color };
}
