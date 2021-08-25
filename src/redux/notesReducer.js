import { ADD_NOTE } from './constants';
//import { getAllQuestions, pickQuestion } from '../../utilities/questions';
//import { resetDay, addAnswer } from '../../utilities/stats';
import { saveItem, loadItem } from '../utilities/storage';

const notesKey = 'notedNotes';

const defaultState = {
  notes: loadItem(notesKey, {}), //??? add default
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
