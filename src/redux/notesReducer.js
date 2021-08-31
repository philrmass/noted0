import { ADD_NOTE, REMOVE_NOTE } from './constants';
import { getEmptyNote, getNotesDefault } from '../utilities/notes';
import { saveItem, loadItem } from '../utilities/storage';

const allKey = 'notedNotes';
const parentIdKey = 'notedParent';

const defaultState = {
  all: loadItem(allKey, getNotesDefault()),
  parentId: loadItem(parentIdKey, 'root'),
  //removedNote: null
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
      };
    }
    case REMOVE_NOTE: {
      const parent = state.all[action.parentId];
      const children = parent.children.filter(id => id !== action.id);
      const removed = removeProperty(action.id, state.all);
      const all = {
        ...removed,
        [parent.id]: {
          ...parent,
          children,
        },
      };

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

function removeProperty(key, obj) {
  const { [key]: _, ...rest } = obj;
  return rest;
}
