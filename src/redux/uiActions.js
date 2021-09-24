import {
  CLEAR_NOTE,
  EDIT_NOTE,
  SELECT_NOTE,
} from './constants';

export function clearNote() {
  return { type: CLEAR_NOTE };
}

export function editNote(id) {
  return { type: EDIT_NOTE, id };
}

export function selectNote(id) {
  return { type: SELECT_NOTE, id };
}
