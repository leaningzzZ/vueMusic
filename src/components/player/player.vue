<template>
  <div class="player" :style="top" >
    <audio :src="this.songUrl"  autoplay controls></audio>
  </div>
</template>
<script>
import { constants } from 'crypto';
export default {

  // created() {
  //   console.log(this.$store.state.songList);
  //   this.$api
  //     .get(`tencent/url?id=${this.$route.params.mid}&isRedirect=0`)
  //     .then(res => {
  //       this.songUrl = res.data.data;
  //     });
  // },
  data() {
    return {
      songUrl: ""
    };
  },
  watch: {
    onPlaying: function(){
      console.log(1)
      this.$api.get(`tencent/url?id=${this.$store.state.onPlaying}&isRedirect=0`).then(res => {
        this.songUrl = res.data.data;
      });
    }
  },
  computed: {
    onPlaying:function(){
      return this.$store.state.onPlaying
    },
    // songChanged: function() {
    //     console.log(1)
    //   this.$api.get(`tencent/url?id=${this.$store.state.onPlaying}&isRedirect=0`).then(res => {
    //     this.songUrl = res.data.data;
    //   });
    // }
  }
};
</script>
<style>
audio {
  width: 100%;
}

.player{
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
}
</style>