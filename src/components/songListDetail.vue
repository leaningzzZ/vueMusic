<template>
  <div class="container" v-loading="loading">
    <div class="listHeader">
      <div class="img">
        <img :src="listData.logo" alt>
      </div>
      <div class="title">
        <h3>{{listData.dissname}}</h3>
        <span class="nickname">作者：{{listData.nickname}}</span>
        <span class="playCount">{{playCount}}次播放</span>
      </div>
    </div>
    <div class="listDesc">
      <p class="desc">简介：{{listData.desc}}</p>
    </div>
    <div class="listBody">
      <div class="title">
        <p>歌单列表</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in listData.songlist" :key="item.id" @click="musicPlay(index)">
            <div class="songIndex">{{index+1}}</div>
            <div class="songInfo">
              <h4 class="songName">{{item.name}}</h4>
              <div class="singer">{{item.singer[0].name}}</div>
              <div class="el-icon-caret-right"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loading = true;
    (this.listId = window.localStorage.listId),
      (this.playCount = window.localStorage.listennum),
      this.$api.get(`tencent/songList?id=${this.listId}`).then(res => {
        this.listData = res.data.data[0];
        this.loading = false;
        this.$store.commit('addIntoPlayList',this.listData.songlist)
        console.log(this.$store.state.playList)
      });
  },
  data() {
    return {
      loading: false,
      listId: "",
      playCount: "",
      listData: {
        nickname: "",
        desc: "",
        logo: "",
        songnum: "",
        songs: [],
        title: ""
      }
    };
  },
  methods: {
    musicPlay(index) {
      this.$store.commit("musicPlay",index)
    }
  }
};
</script>
<style scoped>
.container {
  text-align: left;
  font-size: 16px;
  margin-top: 2vh;
  height: 100%;
}
.listHeader {
  padding: 2vh;
  background-color: #e2e2e3;
  border-left: 2px #31c27c solid;
}
.listHeader .img {
  width: 20%;
  display: inline-block;
}
.listHeader .img img {
  width: 20vw;
  height: 20vw;
}
.listHeader .title {
  display: inline-block;
  margin-top: 0;
  vertical-align: top;
  margin-left: 5%;
  height: 20vw;
  width: 70%;
  position: relative;
  border-left: 1px solid black;
}
.title h3 {
  margin: 0;
  text-align: center;
  word-wrap: none;
}
.title {
  border-left: 2px #31c27c solid;
}
.title span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 0;
  /* margin:0; */
}
.nickname {
  left: 5%;
}
.playCount {
  right: 5%;
}
.listDesc .desc {
  padding: 2vh;
  margin: 0;
}
.listBody .title {
  background: #e2e2e3;
}
.listBody .title p {
  padding: 0;
  margin: 2vh;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
}
.songName {
  margin: 0;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.singer {
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.songIndex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  font-size: 17px;
  color: #999;
}
.songInfo {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding-left: 2vh;
  padding-right: 2vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.singer {
  vertical-align: top;
}
.el-icon-caret-right:before {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid black;
}
</style>