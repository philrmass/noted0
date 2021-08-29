import {
  ADD_NOTE,
} from './constants';

export function addNote(parentId) {
  return { type: ADD_NOTE, parentId };
}
