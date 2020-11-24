import { TextSelection } from 'prosemirror-state';

import { entireRangeHasMark } from './utils';

export function toggleMark($type, attrs = {}) {
  return function doToggleMark(state, dispatch) {
    let { tr } = state;
    const { from, to, empty } = state.selection;
    const $cursor =
      state.selection instanceof TextSelection
        ? state.selection.$cursor
        : undefined;
    const mark = $type.create(attrs);

    if (empty) {
      const storedMarks = tr.storedMarks ?? $cursor?.marks();
      if (storedMarks && mark.isInSet(storedMarks)) {
        tr = tr.removeStoredMark(mark);
      } else {
        tr = tr.addStoredMark(mark);
      }
    } else if (entireRangeHasMark(from, to, mark)(state)) {
      tr = tr.removeMark(from, to, mark);
    } else {
      tr = tr.addMark(from, to, mark);
    }
    dispatch && dispatch(tr.scrollIntoView());
    return true;
  };
}
