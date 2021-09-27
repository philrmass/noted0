import {
  CLEAR_NOTE,
  EDIT_NOTE,
  SELECT_NOTE,
} from './constants';
import { saveItem, loadItem } from '../utilities/storage';

const parentIdsKey = 'notedParents';

const defaultState = {
  editingId: null,
  parentIds: loadItem(parentIdsKey, ['root']),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_NOTE: {
      const parentIds = state.parentIds.length > 1 ? state.parentIds.slice(0, -1) : state.parentIds;

      saveItem(parentIdsKey, parentIds);
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

      saveItem(parentIdsKey, parentIds);
      return {
        ...state,
        parentIds,
      };
    }
    default:
      return state;
  }
}
