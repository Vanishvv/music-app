import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSongId: "33894312",
    startLoad: "true",
    currentSongData: [],
    playState: "paused",
    currentUserName: ""
  },
  mutations: {
    changeCurrentSongId(state, currentSongId) {
      state.currentSongId = currentSongId;
    },
    changeCurrentSongData(state, currentSongData) {
      state.currentSongData = currentSongData;
    },
    changeStartLoad(state, startLoad) {
      state.startLoad = startLoad;
    },
    changePlayState(state, playState) {
      state.playState = playState;
    },
    changeCurrentUserName(state, currentUserName) {
      state.currentUserName = currentUserName;
    }
  },
  getters: {
    getterCurrentSongId(state) {
      return state.currentSongId;
    },
    getterCurrentSongData(state) {
      return state.currentSongData;
    },
    getterStartLoad(state) {
      return state.startLoad;
    },
    getterPlayState(state) {
      return state.playState;
    },
    getterCurrentUserName(state) {
      return state.currentUserName;
    }
  },
  actions: {
    getSongId({ commit }, data) {
      commit("changeCurrentSongId", data);
    },
    getStart({ commit }, data) {
      commit("changeStartLoad", data);
    },
    getSongData({ commit }, data) {
      commit("changeCurrentSongData", data);
    },
    getPlayState({ commit }, data) {
      commit("changePlayState", data);
    },
    getCurrentUserName({ commit }, data) {
      commit("changeCurrentUserName", data);
    }
  }
});
