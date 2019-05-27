<template>
    <div>
        <div class="container" v-loading="loading">
            <div class="listBody">
                <div class="list">
                    <ul>
                    <li v-for="(item,index) in searchList" :key="item.id" @click="musicPlay(index)">
                        <div class="songIndex">{{index+1}}</div>
                        <div class="songInfo">
                        <h4 class="songName">{{item.songname}}</h4>
                        <div class="singer">{{item.singer[0].name}}</div>
                        <div class="el-icon-caret-right"></div>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
   created() {
    this.loading = true;
    this.keyword = window.localStorage.keyword
    this.$api.get(`tencent/search?keyword=${this.keyword}&type=song&pageSize=100&page=0`).then(res => {
    this.searchList = res.data.data.list
    this.loading = false;
    this.$store.commit('addIntoPlayList',this.searchList)
    console.log(this.$store.state.playList)
      });
  },
   data(){
        return{
            keyword:"",
            searchList:[]
        }
    },
    methods:{
        search(keyword){
            let searchStorage=window.localStorage;
            searchStorage.keyword=keyword;
        },
        musicPlay(index) {
            this.$store.commit("musicPlay",index)
        }
    },
    
}
</script>

<style>

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

