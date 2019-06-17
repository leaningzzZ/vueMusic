<template>
  <div class="content">
    <div class="player" v-if="!this.$store.state.isFullScreen">
      {{this.$store.state.onPlayingIndex}}
      <div class="audioContent">
        <div class="pic" @click="isPlaying?fullScreen():''">
          <img :src="this.songPic" alt>
        </div>
        <div class="tool">
          <i class="el-icon-video-play" v-if="!isPlaying" @click="musicPlay"></i>
          <i class="el-icon-video-pause" v-if="isPlaying" @click="musicPause"></i>
          <i class="el-icon-caret-right" @click="nextMusic"></i>
        </div>
        <div class="process">
          <el-progress
            :percentage="musicProcess"
            :stroke-width="10"
            color="#6f7ad3"
            :show-text="false"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="fullScreenPlayer" v-else>
      <div class="topbar">
        <i class="el-icon-back" @click="fullScreen"></i>
        <div class="title">{{songInfo.name}}</div>
      </div>
      <div class="body">
        <div class="img">
          <img :src="this.songPic" :class="this.isPlaying?'play':pause" alt>
        </div>
      </div>
      <div class="footer">
        <div class="process">
          <span class="currentTime">{{currentTime|timeFormat}}</span>
          <div class="processBody">
            <el-progress
              :percentage="musicProcess"
              :stroke-width="10"
              color="#6f7ad3"
              :show-text="false"
            ></el-progress>
          </div>
          <span class="duration">{{duration|timeFormat}}</span>
        </div>
        <div class="footTool">
          <i class="el-icon-caret-left" @click="lastMusic"></i>
          <i class="el-icon-video-play" v-if="!isPlaying" @click="musicPlay"></i>
          <i class="el-icon-video-pause" v-if="isPlaying" @click="musicPause"></i>
          <i class="el-icon-caret-right" @click="nextMusic"></i>
        </div>
      </div>
    </div>
    <audio
      :src="this.songUrl"
      autoplay
      @ended="nextMusic"
      ref="audio"
      @canplay="oncanPlay()"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>
<script>
import axios from "axios";
import Lyric from "lyric-parser";
export default {
  data() {
    return {
      songInfo: "",
      songUrl: "",
      songPic: "", //图片,
      songLyric: "",
      musicProcess: 0, //播放进度
      isPlaying: false, //是否正在播放
      currentTime: 0, //当前播放时长
      duration: 0 //总时长
    };
  },
  methods: {
    fullScreen() {
      this.$store.commit("changeIsFullScreen");
    },
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime;
      if (!isNaN(this.duration)) {
        this.musicProcess = (this.currentTime / this.duration) * 100;
      }
    },
    nextMusic() {
      this.$store.commit("nextMusic", 1);
    },
    lastMusic() {
      this.$store.commit("nextMusic", -1);
    },
    getSongUrl(newer) {
      return this.$api.get(`tencent/url?id=${newer}&isRedirect=0`);
    },
    getSongPic(newer) {
      return this.$api.get(`tencent/pic?id=${newer}&isRedirect=0`);
    },
    getSongInfo(newer) {
      return this.$api.get(`tencent/song?id=${newer}`);
    },
    getSongLyric(newer) {
      return this.$api.get(`/tencent/lrc?id=${newer}`);
    },
    musicPause() {
      this.$refs.audio.pause();
      this.isPlaying = false;
      console.log(1);
    },
    musicPlay() {
      this.$refs.audio.play();
      this.isPlaying = true;
    },
    oncanPlay() {
      console.log(this.$refs.audio.duration);
      this.duration = this.$refs.audio.duration;
      this.canPlay = true;
      console.log(this.duration);
    }
  },
  watch: {
    songMid: {
      //监听songMid的变化，改变则重新请求url
      handler(newer, older) {
        // 可以获取新值与老值两个参数
        console.log(axios);
        axios
          .all([
            this.getSongUrl(newer),
            this.getSongPic(newer),
            this.getSongInfo(newer),
            this.getSongLyric(newer)
          ])
          .then(
            axios.spread((urlData, picData, infoData, lyricData) => {
              this.songUrl = urlData.data.data;
              this.songPic = picData.data.data;
              this.songInfo = infoData.data.data[0];
              this.songLyric = lyricData.data;
              console.log(this.songLyric);
              let lyric = new Lyric(this.songLyric);
              console.log(lyric);
              this.isPlaying = true;
            })
          );
      }
    }
  },
  computed: {
    songMid: function() {
      return this.$store.state.onPlayingMid;
    }
  },
  filters: {
    timeFormat(time) {
      //秒转化格式
      if (time) {
        let minute = time / 60;
        let second = time % 60;
        if (second < 10) {
          return `${Math.floor(minute)}:0${Math.floor(second)}`;
        } else {
          return `${Math.floor(minute)}:${Math.floor(second)}`;
        }
      } else {
        return `00:00`;
      }
    }
  }
};
</script>
<style>
.content {
  position: relative;
  z-index: 999;
}
audio {
  width: 100%;
}

.player {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
}
.audioContent {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  padding: 0px 10px;
  border: 1px solid #999;
}
.audioContent .pic,
.audioContent .pic img {
  display: inline-block;
  height: 100%;
  width: 50px;
}
.audioContent .tool {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  vertical-align: top;
}
.audioContent .tool .el-icon-caret-right:before {
  border: none;
}
.audioContent .process {
  display: inline-block;
  width: 70%;
  height: 50px;
  line-height: 50px;
  vertical-align: top;
  padding-top: 18px;
}
.fullScreenPlayer {
  height: 100%;
  width: 100%;
  background: #666;
  position: fixed;
  bottom: 0;
  color: #fff;
}
.fullScreenPlayer .topbar {
  height: 5vh;
  line-height: 5vh;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.fullScreenPlayer .topbar .title {
  display: inline-block;
  width: 90%;
  text-align: center;
}
.fullScreenPlayer .body .img {
  height: 80vh;
  width: 100%;
}
.fullScreenPlayer .body .img img {
  margin-top: 20vh;
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
}
.fullScreenPlayer .footer {
  height: 15vh;
}
.fullScreenPlayer .footer .processBody {
  width: 70%;
  display: inline-block;
  margin: 0 20px;
}
.fullScreenPlayer .footer .footTool {
  width: 100%;
  height: 80%;
  font-size: 40px;
  margin-top: 20px;
}
.fullScreenPlayer .footer .footTool .el-icon-caret-right:before {
  border: none;
}
.play {
  animation: rotate 20s linear infinite;
}
.pause {
  animation-play-state: paused;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>