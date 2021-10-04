import {
  CLEAR_NOTE,
  CLEAR_SCROLL_TARGET,
  EDIT_NOTE,
  RECORD_SCROLL,
  SELECT_NOTE,
} from './constants';

export function clearNote() {
  return { type: CLEAR_NOTE };
}

export function clearScrollTarget() {
  return { type: CLEAR_SCROLL_TARGET };
}

export function editNote(id) {
  return { type: EDIT_NOTE, id };
}

export function recordScroll(scroll) {
  return { type: RECORD_SCROLL, scroll };
}

export function selectNote(id) {
  return { type: SELECT_NOTE, id };
}
