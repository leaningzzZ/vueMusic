import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList:[],//播放列表
    onPlaying:""//正在播放的,存放歌曲的mid
  },
  mutations: {
    addIntoPlayList (state, list) { //点击歌单时，将歌单加入播放列表
      state.playList = list;
    },
    musicPlay(state,songMid){
      state.onPlaying = songMid; 
    }
  },
  actions: {

  }
})
