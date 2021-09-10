import {
  EDIT_NOTE,
} from './constants';

export function editNote(id) {
  return { type: EDIT_NOTE, id };
}
