import {
  ADD_OVERLAY,
  EDIT_NOTE,
  REMOVE_OVERLAY,
} from './constants';

export function addOverlay(name) {
  return { type: ADD_OVERLAY, name };
}

export function editNote(id) {
  return { type: EDIT_NOTE, id };
}

export function removeOverlay(name) {
  return { type: REMOVE_OVERLAY, name };
}
