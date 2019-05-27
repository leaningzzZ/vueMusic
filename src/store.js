import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList:[],//播放列表
    onPlayingIndex:-1,//正在播放的,存放歌曲的mid
    onPlayingMid:"",
    playModel:"list"//random随机播放,list顺序播放
  },
  mutations: {
    //点击歌单时，将歌单加入播放列表
    addIntoPlayList (state, list) {
      state.playList = list;
    },
    //点击歌曲，通过索引改变mid
    musicPlay(state,index){
      if(index||index==0){
      state.onPlayingIndex = index;
      }
      if( state.playList[state.onPlayingIndex].mid !="" && state.playList[state.onPlayingIndex].mid !=null){
        state.onPlayingMid=state.playList[state.onPlayingIndex].mid
      }
      else if( state.playList[state.onPlayingIndex].musicData.songmid != "" && state.playList[state.onPlayingIndex].musicData.songmid != null){
        state.onPlayingMid=state.playList[state.onPlayingIndex].musicData.songmid
      }
    },

    //播放完切歌
    nextMusic(state){
      if(state.playModel=="list"){
        state.onPlayingIndex++;
      }else if(state.playModel=="random"){
        state.onPlayingIndex=state.onPlayingIndex + Math.floor(Math.random()*state.playList.length)//随机加上一个不大于列表中歌曲总数的整数。待验证
      }
      this.commit("musicPlay")
    }
  },
  actions:{

  }
})
