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
    <div class="title">热门歌单推荐</div>
    <div class="songList" v-if="recommendData.slider.length>0">
      <ul>
        <li v-for="item in recommendData.songList.data" :key="item.id">
            <img :src="item.pic" alt="">
            <p class="listTitle">{{item.name}}</p>
            <p class="playCount">{{item.playCount}}次播放</p>
            <p class="creator">{{item.creator}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
import {api} from "../../api/http.js"
export default {
  created() {
    console.log(1);
    this.loading = true;
    this._getRecommend();
    // this._getDiscList()
    console.log(api)
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        this.recommendData = res.data;
        console.log(this.recommendData);
        this.loading = false;
        api.get("music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=10").then((res)=>{
          this.recommendData.songList=res.data
        })
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
.title{
  color:black;
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 3vh
}
.songList ul{
  list-style:none;
  display: inline; 
  margin:0;
  padding:0;
}
.songList ul li{
  border:1px solid black;
  text-align: left
}
.songList ul li img{
  height: 15vh;
  width: 15vh;
  display: inline-block;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-left: 3vw
}
.songList ul li p{
  margin:0;
  padding:0;
}
.listTitle{
  /* display:inline-block */
}
</style>
