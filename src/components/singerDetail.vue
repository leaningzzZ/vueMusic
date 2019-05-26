<template>
  <div class="listBody">
      <div class="title">
        <p>歌单列表</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in singerData.song" :key="item.id" @click="singerMusicPlay(index)">
            <div class="songIndex">{{index+1}}</div>
            <div class="songInfo">
              <h4 class="songName">{{item.musicData.albumname}}</h4>
              <div class="singer">{{item.musicData.singer[0].name}}</div>
              <div class="el-icon-caret-right"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  created() {
    this.loading = true;
    (this.singerId = window.localStorage.singerId),
      this.$api.get(`tencent/song/artist?id=${this.singerId}`).then(res => {
        console.log(res.data.data)
        this.singerData.song = res.data.data;
        this.loading = false
         this.$store.commit('addIntoPlayList',this.singerData.song)
      });
  },
  data() {
    return {
      singerId:"",
      loading: false,
      singerData: {
        song: []
      }
    };
  },
  methods: {
    singerMusicPlay(index) {
      this.$store.commit("singerMusicPlay",index)
    }
  }
};
</script>
<style scoped>

.listBody{
  margin-bottom: 8vh;
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