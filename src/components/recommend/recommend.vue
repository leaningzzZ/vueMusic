<template>
  <div>
    <div class="swiper" v-loading="loading">
      <swiper ref="mySwiper" v-if="recommendData.slider.length>0">
        <swiper-slide v-for="item in recommendData.slider" :key="item.id">
          <a href="#">
            <img :src="item.picUrl" alt>
          </a>
        </swiper-slide>
      </swiper>
    </div>
    <div class="title">热门歌单推荐</div>
    <div class="songList" v-if="recommendData.slider.length>0">
      <ul>
        <li v-for="item in recommendData.songList" :key="item.dissid" @click="goSongListDetail(item.dissid,item.listennum)">
            <div class="listItem">
              <div class="listPic">
                <img :src="item.imgurl" alt="">
              </div>
                <p class="listTitle">{{item.dissname}}</p>
                <div class="listennum">
                  <p>
                    <i class="el-icon-service"></i>
                    {{item.listennum}}
                  </p>
                </div>
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
          "tencent/songList/hot?cat=全部&pageSize=100&page=0"
        )
        .then(res => {
          console.log(res.data)
          this.recommendData.songList = res.data.data.list;
          this.listLoading = false;
        });
    },
    goSongListDetail(dissid,listennum) {
      console.log("xxx"+this.songList)
      let storage=window.localStorage;
      storage.listId=dissid;
      storage.listennum=listennum;//修复歌单列表刷新报错，通过采用localStorage传值
      this.$router.push({name: 'songListDetail'})
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
.swiper,.swiper-container{
  height: 30vh;
}
.title{
  color:black;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 17px;
  text-align: left;
  padding-left: 10px;
  border-left: 1.5px #31c27c solid 
}
.songList{
  width: 100%;
}
.songList ul {
  width: 100%;
  list-style: none;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.songList ul li {
  padding-left: 0.6%;
  padding-right: 0.6%;
  width: 32%;
  text-align: left;
  float: left;
  display: inline;
  padding-bottom: 20px;
}

.listItem{
  position: relative;
  width: 100%;
}

.listItem p{
  margin: 0;
  font-size: 12px;
}
.listPic {
  width: 100%;
  display: inline-block;
}
.listPic img {
  height: 100%;
  width: 100%;
}

.listennum{
  position: absolute;
  right:5px;
  top:5px;
  color:#FFFFFF;
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
