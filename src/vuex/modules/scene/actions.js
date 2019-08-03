import * as types from '../../types';

export default {
  add({commit, state}, payload) {
    commit(types.ADD_PRIMITIVE, payload);
  },
  del({commit, state}, payload) {
    commit(types.DEL_PRIMITIVE, payload);
  }
}