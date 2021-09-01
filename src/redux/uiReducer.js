import { EDIT_NOTE } from './constants';
import { /*saveItem, */loadItem } from '../utilities/storage';

const parentIdKey = 'notedParent';

const defaultState = {
  editingId: null,
  overlays: [],
  parentId: loadItem(parentIdKey, 'root'),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
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
    //saveItem(allKey, all);
    default:
      return state;
  }
}
