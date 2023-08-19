import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: [],
  },
  getters: {
    INFO(state) {
      return state.info;
    },
  },
  mutations: {
    SET_INFORMATION_TO_STATE: (state, info) => {
      state.info = info.features;
    },
  },
  actions: {
    GET_INFO_FROM_API({ commit }) {
      return axios('https://api-invest.admlr.lipetsk.ru/api/invest/get_filtered_objects2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          objects: true,
          sez: [227, 228],
        },
      }).then((info) => {
        commit('SET_INFORMATION_TO_STATE', info.data);
        return info;
      });
    },
  },
});
