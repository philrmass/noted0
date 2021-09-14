import {
  ADD_LOG,
  EDIT_NOTE,
} from './constants';

export function editNote(id) {
  return { type: EDIT_NOTE, id };
}

export function addLog(text) {
  return { type: ADD_LOG, text };
}
