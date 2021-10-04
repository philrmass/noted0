import {
  ADD_NOTE,
  CLEAR_SCROLL_ID,
  CLOSE_SAVE_DIALOG,
  MOVE_NOTE,
  REMOVE_NOTE,
  REVERT_NOTE,
  SET_NOTES,
  UPDATE_NOTE,
} from './constants';
import { getEmptyNote, getNotesDefault } from '../utilities/notes';
import { saveItem, loadItem } from '../utilities/storage';
import { inSameMonth } from '../utilities/time';

const allKey = 'notedAll';
const lastColorKey = 'notedLastColor';
const lastSaveKey = 'notedLastSave';

const defaultState = {
  all: getNotesDefault(), //loadItem(allKey, getNotesDefault()),
  lastColor: null, //loadItem(lastColorKey, null),
  removedNotes: null,
  removedParentId: null,
  saveDialogIsOpen: false,
  scrollId: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      const note = getEmptyNote(action.id);
      const all = addNotes(state.all, [note], action.parentId);
      const scrollId = note.id;

      //saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNotes: null,
        removedParentId: null,
        scrollId,
      };
    }
    case CLEAR_SCROLL_ID:
      return {
        ...state,
        scrollId: null,
      };
    case CLOSE_SAVE_DIALOG:
      return {
        ...state,
        saveDialogIsOpen: false,
      };
    case MOVE_NOTE: {
      const parent = state.all[action.parentId];
      const from = parent.children.findIndex(id => id === action.fromId);
      const to = parent.children.findIndex(id => id === action.toId);
      const children = move(parent.children, from, to);
      const all = {
        ...state.all,
        [parent.id]: {
          ...parent,
          children,
        },
      };

      //saveItem(allKey, all);
      return {
        ...state,
        all,
      };
    }
    case REMOVE_NOTE: {
      const parent = state.all[action.parentId];
      const children = parent.children.filter(id => id !== action.id);
      const removedIds = findAllChildIds(action.id, state.all);
      const removedNotes = Object.values(state.all).filter(id => removedIds.includes(id));
      const remaining = removedIds.reduce((obj, id) => removeProperty(id, obj), state.all);

      const all = {
        ...remaining,
        [parent.id]: {
          ...parent,
          children,
        },
      };

      //saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNotes,
        removedParentId: action.parentId,
      };
    }
    case REVERT_NOTE: {
      const all = addNotes(state.all, state.removedNotes, state.removedParentId);

      //saveItem(allKey, all);
      return {
        ...state,
        all,
        removedNote: null,
        removedParentId: null,
      };
    }
    case SET_NOTES:
      //saveItem(allKey, action.all);
      return {
        ...state,
        all: action.all,
      };
    case UPDATE_NOTE: {
      const params = {
        text: action.text,
        color: action.color,
      };
      const all = updateNote(state.all, action.id, params);
      const lastColor = action.color ?? state.lastColor;
      const saveDialogIsOpen = checkSaveDialog();

      //saveItem(allKey, all);
      //saveItem(lastColorKey, lastColor);
      return {
        ...state,
        all,
        lastColor,
        saveDialogIsOpen,
      };
    }
    default:
      return state;
  }
}

function addNotes(all, notes, parentId) {
  const parent = all[parentId];
  const children = [...parent.children, notes[0].id];
  const notesObj = notes.reduce((obj, note) => ({
    ...obj,
    [note.id]: note,
  }), {});

  return {
    ...all,
    [parent.id]: {
      ...parent,
      children,
    },
    ...notesObj,
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

function move(list, from, to) {
  if (to < from) {
    const a = list.slice(0, to);
    const b = list.slice(to, from);
    const c = list.slice(from, from + 1);
    const d = list.slice(from + 1);

    return [...a, ...c, ...b, ...d];
  } else if(from < to) {
    const a = list.slice(0, from);
    const b = list.slice(from, from + 1);
    const c = list.slice(from + 1, to + 1);
    const d = list.slice(to + 1);

    return [...a, ...c, ...b, ...d];
  }

  return list;
}

function checkSaveDialog() {
  const now = Date.now();
  const lastSaveAt = Number(loadItem(lastSaveKey, now));
  const inNewMonth = !inSameMonth(lastSaveAt, now);
  saveItem(lastSaveKey, now);

  return inNewMonth;
}

function findAllChildIds(id, notes) {
  const note = notes[id];
  const children = note?.children ?? [];
  return children.reduce((all, childId) => [...all, ...findAllChildIds(childId, notes)], [id]);
}
