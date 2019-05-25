<template>
  <div class="player">
    {{this.$store.state.onPlayingIndex}}
    <audio :src="this.songUrl" autoplay controls @ended="nextMusic"></audio>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      songUrl: ""
    };
  },
  methods: {
    nextMusic() {
      this.$store.commit("nextMusic")
    }
  },
  watch: {
    songMid: {//监听songMid的变化，改变则重新请求url
      handler: function(newer, older) {
        // 可以获取新值与老值两个参数
        this.$api
          .get(`tencent/url?id=${newer}&isRedirect=0`)
          .then(res => {
            this.songUrl = res.data.data;
          });
        // console.log(newer, "新ID");
        // console.log(older, "旧ID");
      },
    }
  },
  computed: {
    songMid: function() {
      return this.$store.state.onPlayingMid;
    }
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
</style>