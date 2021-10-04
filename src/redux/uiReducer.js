import {
  CLEAR_NOTE,
  CLEAR_SCROLL_TARGET,
  EDIT_NOTE,
  RECORD_SCROLL,
  SELECT_NOTE,
} from './constants';
import { saveItem, loadItem } from '../utilities/storage';

const parentIdsKey = 'notedParents';
const parentScrollsKey = 'notedScrolls';

const defaultState = {
  editingId: null,
  parentIds: loadItem(parentIdsKey, []),
  parentScrolls: loadItem(parentScrollsKey, []),
  scroll: null,
  scrollTarget: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_NOTE: {
      const canClear = state.parentIds.length > 0;
      const parentIds = canClear ? state.parentIds.slice(0, -1) : state.parentIds;
      const parentScrolls = canClear ? state.parentScrolls.slice(0, -1) : state.parentScrolls;
      const scrollTarget = canClear ? state.parentScrolls.at(-1) : null;

      saveItem(parentIdsKey, parentIds);
      saveItem(parentScrollsKey, parentScrolls);
      return {
        ...state,
        parentIds,
        parentScrolls,
        scroll: scrollTarget,
        scrollTarget,
      };
    }
    case CLEAR_SCROLL_TARGET:
      return {
        ...state,
        scrollTarget: null,
      };
    case EDIT_NOTE: {
      return {
        ...state,
        editingId: action.id,
      };
    }
    case RECORD_SCROLL:
      return {
        ...state,
        scroll: action.scroll,
      };
    case SELECT_NOTE: {
      const scroll = state.scroll ?? 0;
      const parentIds = [...state.parentIds, action.id];
      const parentScrolls = [...state.parentScrolls, scroll];

      saveItem(parentIdsKey, parentIds);
      saveItem(parentScrollsKey, parentScrolls);
      return {
        ...state,
        parentIds,
        parentScrolls,
      };
    }
    default:
      return state;
  }
}
