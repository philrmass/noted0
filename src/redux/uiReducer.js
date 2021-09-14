import { ADD_LOG, EDIT_NOTE } from './constants';
import { /*saveItem, */loadItem } from '../utilities/storage';

const parentIdKey = 'notedParent';

const defaultState = {
  editingId: null,
  logs: [],
  parentId: loadItem(parentIdKey, 'root'),
  //??? remove after testing
  //editingId: '0db22f4a-cfd3-46d6-8292-2eca5266d444',
};

//saveItem(parentIdKey, parentId);
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.text],
      };
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
