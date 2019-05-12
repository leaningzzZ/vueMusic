<template>
  <div>
    <el-carousel
      trigger="click"
      height="30vh"
      indicator-position="outside"
      arrow="never"
      :interval="4000"
      v-loading="loading"
    >
      <el-carousel-item v-for="item in recommendData.slider" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt>
        </a>
      </el-carousel-item>
    </el-carousel>
    <div>热门歌单推荐</div>
  </div>
</template>
<script>
import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
import {getDiscList} from "../../api/recommend.js"
export default {
  created() {
    console.log(1);
    this._getRecommend();
    // this._getDiscList()
  },
  methods: {
    _getRecommend() {
      this.loading = true;
      getRecommend().then(res => {
        this.recommendData = res.data;
        console.log(this.recommendData);
        this.loading = false;
      });
    },
    // _getDiscList(){
    //     getDiscList().then(res=>{
    //         console.log(res)
    //     })
    // }
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
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
button{
    z-index:999
}
</style>
