import { EDIT_NOTE } from './constants';

const defaultState = {
  editingId: null,
  overlays: [],
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
    default:
      return state;
  }
}
