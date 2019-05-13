<template>
  <div>
    <div class="swiper" v-loading="loading">
      <swiper ref="mySwiper" v-if="recommendData.slider.length>0">
        <swiper-slide v-for="item in recommendData.slider" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt>
          </a>
        </swiper-slide>
      </swiper>
    </div>
    <div>热门歌单推荐</div>
  </div>
</template>
<script>
import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
import { getDiscList } from "../../api/recommend.js";
export default {
  created() {
    console.log(1);
    this.loading = true;
    this._getRecommend();
    // this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        this.recommendData = res.data;
        console.log(this.recommendData);
        this.loading = false;
      });
    }
  },
  data() {
    return {
      recommendData: {
        radioList: [],
        slider: [],
        songList: []
      },
      loading: false
    };
  }
};
</script>
<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper{
  height: 23vh;
}
</style>
