const state = {
  authenticated: false,
};

const getters = {
  authenticated() {
    return state.authenticated;
  },
};

const actions = {
  updateAuthenticateStatus({ commit }, status) {
    commit('UPDATE_AUTHENTICATE_STATUS', status);
  },
};

const mutations = {
  UPDATE_AUTHENTICATE_STATUS(status) {
    state.authenticated = status;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
