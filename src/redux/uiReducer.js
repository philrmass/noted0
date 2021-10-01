import {
  CLEAR_NOTE,
  EDIT_NOTE,
  SELECT_NOTE,
} from './constants';
import { saveItem, loadItem } from '../utilities/storage';

const parentIdsKey = 'notedParents';

const defaultState = {
  editingId: null,
  scrollId: null,
  scrollTop: false,
  parentIds: loadItem(parentIdsKey, ['root']),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_NOTE: {
      const scrollId = state.parentIds.length > 1 ? state.parentIds[state.parentIds.length - 1] : state.scrollId;
      const parentIds = state.parentIds.length > 1 ? state.parentIds.slice(0, -1) : state.parentIds;

      saveItem(parentIdsKey, parentIds);
      return {
        ...state,
        scrollId,
        scrollTop: false,
        parentIds,
      };
    }
    case EDIT_NOTE: {
      const scrollId = state.editingId && !action.id ? state.editingId : state.scrollId;

      return {
        ...state,
        editingId: action.id,
        scrollId,
        scrollTop: false,
      };
    }
    case SELECT_NOTE: {
      const parentIds = [...state.parentIds, action.id];

      saveItem(parentIdsKey, parentIds);
      return {
        ...state,
        parentIds,
        scrollTop: true,
      };
    }
    default:
      return state;
  }
}
