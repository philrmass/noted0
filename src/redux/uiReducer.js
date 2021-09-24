import {
  CLEAR_NOTE,
  EDIT_NOTE,
  SELECT_NOTE,
} from './constants';
import { /*saveItem, */loadItem } from '../utilities/storage';

const parentIdKey = 'notedParent';
const parentIdsKey = 'notedParents';

const defaultState = {
  editingId: null,
  parentId: loadItem(parentIdKey, 'root'),
  parentIds: loadItem(parentIdsKey, ['root']),
  //??? remove after testing
  //editingId: '0473d95a-7651-45ae-8ca7-8cb9b591846b'
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_NOTE: {
      const parentIds = state.parentIds; //??? implement
      console.log('CLEAR', parentIds);

      //saveItem(parentIdsKey, parentIds); //??? save parent when changed
      return {
        ...state,
        parentIds,
      };
    }
    case EDIT_NOTE: {
      return {
        ...state,
        editingId: action.id,
      };
    }
    case SELECT_NOTE: {
      const parentIds = [...state.parentIds, action.id];

      //saveItem(parentIdsKey, parentIds); //??? save parent when changed
      return {
        ...state,
        parentIds,
      };
    }
    default:
      return state;
  }
}
