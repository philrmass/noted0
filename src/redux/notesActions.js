import {
  ADD_NOTE,
  REMOVE_NOTE,
} from './constants';

export function addNote(parentId) {
  return { type: ADD_NOTE, parentId };
}

export function removeNote(id, parentId) {
  return { type: REMOVE_NOTE, id, parentId };
}
