/**
 * @Author:Wang Jun
 * @Date:2020/6/29/029 15:04
 * @Description:vuex状态管理文件
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSongId: "", //当前歌曲Id
    startLoad: "true", //载入动画显示
    currentSongData: [], //当前歌曲信息
    playState: "playing", //音乐播放状态
    currentUserName: "", //当前用户名
    currentMusicTime: "", //当前音乐播放时间
    currentTrackIds: [] //当前音乐播放列表id
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
    },
    changeCurrentMusicTime(state, currentMusicTime) {
      state.currentMusicTime = currentMusicTime;
    },
    changeCurrentTrackIds(state, currentTrackIds) {
      state.currentTrackIds = currentTrackIds;
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
    },
    getterCurrentMusicTime(state) {
      return state.currentMusicTime;
    },
    getterCurrentTrackIds(state) {
      return state.currentTrackIds;
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
    },
    getCurrentMusicTime({ commit }, data) {
      commit("changeCurrentMusicTime", data);
    },
    getCurrentTrackIds({ commit }, data) {
      commit("changeCurrentTrackIds", data);
    }
  }
});
