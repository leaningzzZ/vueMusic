<template>
  <div class="container" v-loading="loading">
    <div class="listHeader">
      <div class="singerPic">
        <img :src="singerPic" alt>
      </div>
      <div class="singerName">
        <p>{{singerName}}</p>
      </div>
      <div class="singerCountry">
        <p>{{singerCountry}}</p>
      </div>
    </div>
    <div class="listBody">
        <div class="list">
          <ul>
            <li v-for="(item,index) in singerData.song" :key="item.id" @click="singerMusicPlay(index)">
              <div class="songIndex">{{index+1}}</div>
              <div class="songInfo">
                <h4 class="songName">{{item.musicData.songname}}</h4>
                <div class="singer">{{item.musicData.singer[0].name}}</div>
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
    this.singerId = window.localStorage.singerId;
    this.singerName = window.localStorage.singerName;
    this.singerPic = window.localStorage.singerPic;
    this.singerCountry = window.localStorage.singerCountry;
    this.$api.get(`tencent/song/artist?id=${this.singerId}`).then(res => {
      this.singerData.song = res.data.data;
      this.loading = false
      console.log(this.singerData.song)
      this.$store.commit('addIntoPlayList',this.singerData.song)
    })
  },
  data() {
    return {
      singerId:"",
      singerName:"",
      singerPic:"",
      singerCountry:"",
      loading: false,
      singerData: {
        song: []
      }
    };
  },
  methods: {
    singerMusicPlay(index) {
      this.$store.commit("musicPlay",index)
      if(this.$store.state.songLyric.lines){
        this.$store.commit("lyricChange")
      }
    }
  }
};
</script>
<style scoped>
p{
  margin: 0;
  padding: 0;
}
.listHeader{
  position: relative;
}
.singerPic{
  height: 40vh;
  overflow: hidden;
}
.singerPic img{
  width: 100%;
}
.singerName{
  color: #fff;
  position: absolute;
  bottom:40px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  font-size: 25px;
  font-weight: 100;
}

.singerCountry{
  color: #fff;
  position: absolute;
  bottom:15px;
  width: 100%;
  font-size: 15px;
  font-weight: 100;
  margin-right: auto;
  margin-left: auto;
}

.listBody{
  margin-bottom: 8vh;
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