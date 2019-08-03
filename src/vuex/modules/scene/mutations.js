import * as types from '../../types';

export default {
  [types.ADD_PRIMITIVE]: (state, payload) => {
    state.collection.push(payload.mesh);
  },
  [types.DEL_PRIMITIVE]: (state, payload) => {
    state.collection = state.collection.filter(mesh => mesh.uuid !== payload);
  }
}