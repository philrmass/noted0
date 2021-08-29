import { ADD_NOTE } from './constants';
import { getEmptyNote, getNotesDefault } from '../utilities/notes';
import { saveItem, loadItem } from '../utilities/storage';

const notesKey = 'notedNotes';

const defaultState = {
  all: loadItem(notesKey, getNotesDefault()),
  parentId: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      //??? finish this
      const note = getEmptyNote();
      const parent = state.all[action.parentId];
      const children = [];
      const all = {
        ...state.all,
        [parent.uuid]: {
          ...parent,
          children,
        },
        [note.uuid]: note 
      };

      saveItem(notesKey, all);

      return {
        ...state,
        all,
      };
    }
    default:
      return state;
  }
}
