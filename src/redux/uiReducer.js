import { EDIT_NOTE } from './constants';
import { /*saveItem, */loadItem } from '../utilities/storage';

const parentIdKey = 'notedParent';

const defaultState = {
  editingId: null,
  parentId: loadItem(parentIdKey, 'root'),
  //??? remove after testing
  //editingId: '0473d95a-7651-45ae-8ca7-8cb9b591846b'
};

//saveItem(parentIdKey, parentId); //??? save parent when changed
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case EDIT_NOTE: {
      return {
        ...state,
        editingId: action.id,
      };
    }
    default:
      return state;
  }
}
