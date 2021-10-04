import { v4 as uuidv4 } from 'uuid';

import {
  ADD_NOTE,
  CLEAR_SCROLL_ID,
  CLOSE_SAVE_DIALOG,
  MOVE_NOTE,
  REMOVE_NOTE,
  REVERT_NOTE,
  SET_NOTES,
  UPDATE_NOTE,
} from './constants';

export function addNote(parentId) {
  const id = uuidv4();
  return { type: ADD_NOTE, id, parentId };
}

export function clearScrollId() {
  return { type: CLEAR_SCROLL_ID };
}

export function closeSaveDialog() {
  return { type: CLOSE_SAVE_DIALOG };
}

export function moveNote(parentId, fromId, toId) {
  return { type: MOVE_NOTE, parentId, fromId, toId };
}

export function removeNote(parentId, id) {
  return { type: REMOVE_NOTE, parentId, id };
}

export function revertNote() {
  return { type: REVERT_NOTE };
}

export function setNotes(all) {
  return { type: SET_NOTES, all };
}

export function updateNote(id, text, color) {
  return { type: UPDATE_NOTE, id, text, color };
}
