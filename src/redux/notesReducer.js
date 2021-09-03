import {
  ADD_NOTE,
  REMOVE_NOTE,
  REVERT_NOTE,
  UPDATE_COLOR,
  UPDATE_TEXT,
} from './constants';
import { getEmptyNote, getNotesDefault } from '../utilities/notes';
import { saveItem, loadItem } from '../utilities/storage';

const allKey = 'notedNotes';

const defaultState = {
  all: loadItem(allKey, getNotesDefault()),
  removedNote: null,
  removedParenId: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      const note = getEmptyNote(action.id);
      const all = addNote(state.all, note, action.parentId);

      saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNote: null,
        removedParenId: null,
      };
    }
    case REMOVE_NOTE: {
      const parent = state.all[action.parentId];
      const children = parent.children.filter(id => id !== action.id);
      const removedNote = state.all[action.id];
      const remaining = removeProperty(action.id, state.all);
      const all = {
        ...remaining,
        [parent.id]: {
          ...parent,
          children,
        },
      };

      saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNote,
        removedParenId: action.parentId,
      };
    }
    case REVERT_NOTE: {
      const all = addNote(state.all, state.removedNote, state.removedParenId);

      saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNote: null,
        removedParenId: null,
      };
    }
    case UPDATE_COLOR: {
      const params = { color: action.color };
      const all = updateNote(state.all, action.id, params);

      saveItem(allKey, all);
      return {
        ...state,
        all,
      };
    }
    case UPDATE_TEXT: {
      const params = { text: action.text };
      const all = updateNote(state.all, action.id, params);

      saveItem(allKey, all);
      return {
        ...state,
        all,
      };
    }
    default:
      return state;
  }
}

function addNote(all, note, parentId) {
  const parent = all[parentId];
  const children = [...parent.children, note.id];

  return {
    ...all,
    [parent.id]: {
      ...parent,
      children,
    },
    [note.id]: note,
  };
}

function updateNote(all, id, params) {
  const note = {
    ...all[id],
    ...params,
  };

  return {
    ...all,
    [note.id]: note,
  };
}

function removeProperty(key, obj) {
  const { [key]: _, ...rest } = obj;
  return rest;
}
