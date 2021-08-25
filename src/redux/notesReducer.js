import { ADD_NOTE } from './constants';
import { getNotesDefault } from '../utilities/notes';

//import { resetDay, addAnswer } from '../../utilities/stats';
import { saveItem, loadItem } from '../utilities/storage';

const notesKey = 'notedNotes';

const defaultState = {
  all: loadItem(notesKey, getNotesDefault()),
  parent: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTE: {
      const notes = {};

      saveItem(notesKey, notes);

      return {
        ...state,
        notes,
      };
    }
    default:
      return state;
  }
}
