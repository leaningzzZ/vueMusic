<template>
  <div>
    <audio :src="this.songUrl" autoplay controls></audio>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$store.state.songList);
    this.$api
      .get(`tencent/url?id=${this.$route.params.mid}&isRedirect=0`)
      .then(res => {
        this.songUrl = res.data.data;
      });
  },
  data() {
    return {
      songUrl: ""
    };
  },
  computed: {
    songChanged: function() {
        console.log(1)
      this.$api.get(`tencent/url?id=${this.$store.state.onPlaying}&isRedirect=0`).then(res => {
        this.songUrl = res.data.data;
      });
    }
  }
};
</script>
<style>
audio {
  width: 100%;
}
</style>