import { ADD_OVERLAY, EDIT_NOTE, REMOVE_OVERLAY } from './constants';
import { /*saveItem, */loadItem } from '../utilities/storage';

const parentIdKey = 'notedParent';

const defaultState = {
  editingId: null,
  overlays: [],
  parentId: loadItem(parentIdKey, 'root'),
};
//saveItem(parentIdKey, parentId);

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_OVERLAY: {
      const overlays = [...state.overlays, action.name];

      return {
        ...state,
        overlays,
      };
    }
    case EDIT_NOTE: {
      const name = 'editor';
      const filtered = state.overlays.filter((overlay) => overlay !== name);
      const overlays = action.id ? [...filtered, name] : filtered;

      return {
        ...state,
        editingId: action.id,
        overlays,
      };
    }
    case REMOVE_OVERLAY: {
      const overlays = state.overlays.filter((overlay) => overlay !== action.name);

      return {
        ...state,
        overlays,
      };
    }
    default:
      return state;
  }
}
