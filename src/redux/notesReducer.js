import { ADD_NOTE, REMOVE_NOTE, REVERT_NOTE } from './constants';
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
      const parent = state.all[action.parentId];
      const children = [...parent.children, note.id];
      const all = {
        ...state.all,
        [parent.id]: {
          ...parent,
          children,
        },
        [note.id]: note,
      };

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
      const parent = state.all[state.removedParenId];
      const children = [...parent.children, state.removedNote.id];
      const all = {
        ...state.all,
        [parent.id]: {
          ...parent,
          children,
        },
        [state.removedNote.id]: state.removedNote,
      };

      saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNote: null,
        removedParenId: null,
      };
    }
    default:
      return state;
  }
}

function removeProperty(key, obj) {
  const { [key]: _, ...rest } = obj;
  return rest;
}
