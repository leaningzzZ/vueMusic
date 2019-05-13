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
        <li v-for="item in recommendData.songList.data" :key="item.id" @click="getSongListDetail(item.id)">
            <div class="listLeft">
              <img :src="item.pic" alt="">
            </div>
            <div class="listRight">
              <p class="listTitle">{{item.name}}</p>
              <p class="playCount">{{item.playCount}}次播放</p>
              <span class="creator">{{item.creator}}</span>
              <span class="createTime">{{item.createTime}}</span>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
export default {
  created() {
    this.swiperLoading = false;
    this.listLoading = false;
    this._getRecommend();
    this.getSongList();
  },
  methods: {
    _getRecommend() {
      this.swiperLoading = true;
      getRecommend().then(res => {
        this.recommendData.slider = res.data.slider;
        this.swiperLoading = false;
      });
    },
    getSongList() {
      this.listLoading = true;
      this.$api
        .get(
          "music/tencent/hotSongList?key=579621905&categoryId=10000000&sortId=3&limit=10"
        )
        .then(res => {
          this.recommendData.songList = res.data;
          this.listLoading = false;
        });
    },
    goSongListDetail(id) {
      this.$router.push({name: 'songListDetail', params: {id:id}})
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
<style scoped>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper {
  height: 23vh;
}
.title{
  /* background-color: #31c27c; */
  color:black;
  font-size: 17px;
  text-align: left;
  padding-left: 10px;
  border-left: 1px red solid 
}
.songList ul {
  list-style: none;
  display: inline;
  margin: 0;
  padding: 0;
}
.songList ul li {
  text-align: left;
}
.listLeft {
  width: 35%;
  display: inline-block;
}
.listLeft img {
  height: 15vh;
  width: 15vh;
  margin-left: 4vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
}
.listRight {
  vertical-align: top;
  margin-top: 3vh;
  height: 15vh;
  width: 65%;
  display: inline-block;
  position: relative;
}
.listRight p {
  margin: 0;
  padding: 0;
  word-break: normal;
  text-overflow: ellipsis;
}
.listRight .listTitle {
  font-size: 20px;
  color: black;
  padding-bottom: 2vh;
}
.listRight .playCount {
  font-size: 16px;
  color: #ffff77;
}
.creator,
.createTime {
  position: absolute;
  bottom: 0;
}
.createTime {
  right: 3vw;
}
.creator {
  left: 0;
}
</style>
