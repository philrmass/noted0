import { v4 as uuidv4 } from 'uuid';

import {
  ADD_NOTE,
  REMOVE_NOTE,
  REVERT_NOTE,
  UPDATE_COLOR,
  UPDATE_TEXT,
} from './constants';

export function addNote(parentId) {
  const id = uuidv4();
  return { type: ADD_NOTE, id, parentId };
}

export function removeNote(id, parentId) {
  return { type: REMOVE_NOTE, id, parentId };
}

export function revertNote() {
  return { type: REVERT_NOTE };
}

export function updateText(id, text) {
  return { type: UPDATE_TEXT, id, text };
}

export function updateColor(id, color) {
  return { type: UPDATE_COLOR, id, color };
}

