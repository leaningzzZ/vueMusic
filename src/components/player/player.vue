<template>
  <div class="player">
    {{this.$store.state.onPlayingIndex}}
    <!-- el-icon-caret-left左
    el-icon-caret-right右
    el-icon-video-pause暂停
    el-icon-video-play播放 -->
        <div class="audioContent">
            <div class="pic">
              <img :src="this.songPic" alt="">
            </div>
            <div class="tool">
              <i class="el-icon-video-play" v-if="!isPlaying" @click="musicPlay" ></i>
              <i class="el-icon-video-pause" v-if="isPlaying" @click="musicPause"></i>
              <i class="el-icon-caret-right" @click="nextMusic"></i>
            </div>
            <div class="process">
              <el-progress :percentage="musicProcess" :stroke-width="10" color="#6f7ad3" :show-text="false"></el-progress>
            </div>
        </div>
    <audio :src="this.songUrl" autoplay @ended="nextMusic" ref="audio"></audio>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  data() {
    return {
      songUrl: "",
      songPic:"",
      musicProcess:20,
      isPlaying:false,
    };
  },
  methods: {
    nextMusic() {
      this.$store.commit("nextMusic")
    },
    getSongUrl(newer){
      return this.$api.get(`tencent/url?id=${newer}&isRedirect=0`)
    },
    getSongPic(newer){
      return this.$api.get(`tencent/pic?id=${newer}&isRedirect=0`)
    },
    musicPause(){
      this.$refs.audio.pause();
      this.isPlaying=false
      console.log(1)
    },
    musicPlay(){
      this.$refs.audio.play();
      this.isPlaying=true;
      console.log(this.$refs.audio.currentTime/this.$refs.audio.duration)
    },
    oncanPlay(){
      this.canPlay=true
    }
  },
  watch: {
    songMid: {//监听songMid的变化，改变则重新请求url
      handler(newer, older) {
        // 可以获取新值与老值两个参数
        console.log(axios)
        axios.all([this.getSongUrl(newer),this.getSongPic(newer)]).then(axios.spread((urlData,picData)=>{
          this.songUrl=urlData.data.data;
          this.songPic=picData.data.data;
          this.isPlaying=true;
        }))
        // this.$api
        //   .get(`tencent/url?id=${newer}&isRedirect=0`)
        //   .then(res => {
        //     console.log(res)
        //     this.songUrl = res.data.data;
        //   });
        // console.log(newer, "新ID");
        // console.log(older, "旧ID");
      },
    }
  },
  computed: {
    songMid: function() {
      return this.$store.state.onPlayingMid;
    },
    // musicProcess:function(){
    //   if(this.canPlay){
    //     console.log(this.$refs.audio.currentTime*1000)
    //     // return this.$refs.audio.currentTime/this.$refs.audio.duration*100
    //   }
    // }
  }
};
</script>
<style>
audio {
  width: 100%;
}

.player {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
}
.audioContent{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  padding:0px 10px;
  border: 1px solid #999;
}
.audioContent .pic,.audioContent .pic img{
  display: inline-block;
  height: 100%;
  width: 50px;
  background: black;
}
.audioContent .tool{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  vertical-align: top;
}
.audioContent .tool .el-icon-caret-right:before{
  border: none;
}
.audioContent .process{
  display: inline-block;
  width: 70%;
  height: 50px;
  line-height: 50px;
  vertical-align: top;
  padding-top: 18px;
}
</style>