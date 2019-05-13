<template>
  <div class="container" v-loading="loading">
    <!-- <div class="top">
      <span class="topbar">返回</span>
      <span class="title">{{listData.title}}</span>
    </div>
    <div class="desc">
      <img :src="listData.logo" alt="">
    </div> -->
    <div class="listHeader">
      <div class="img">
        <img :src="listData.logo" alt="">
      </div>
      <div class="title">
        <h3>{{listData.title}}</h3>
        <span class="author">作者：{{listData.author}}</span>
        <span class="playCount">{{this.$route.params.playCount}}次播放</span>
      </div>
    </div>
    <div class="desc">
      <p>简介：{{listData.desc}}</p>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loading=true;
    this.listId=this.$route.params.id,
    this.$api.get(`music/tencent/songList?key=579621905&id=${this.listId}`).then(res => {
      this.listData=res.data.data;
      this.loading=false;
      console.log(this.listData)
    });
  },
  data(){
      return {
          loading: false,
          listId:'',
          listData:{
              author:'',
              desc:'',
              logo:'',
              songnum:'',
              songs:[],
              title:''
          }
      }
  },
  methods: {
    
  }
};
</script>
<style scoped>
.container {
  text-align: left;
  font-size: 16px;
}
.listHeader{
  padding: 2vh;
  background-color: #e2e2e3;
}
.listHeader .img{
    width:20%;
    display: inline-block;
}
.listHeader .img img{
    width: 20vw;
    height: 20vw;
}
.title{
  display: inline-block;
  margin-top: 0;
  vertical-align: top;
  margin-left: 5%;
  height: 20vw;
  width: 70%;
  position: relative;
  border-left: 1px solid black; 
}
.title h3{
  margin: 0;
  text-align: center;
}
.title span{
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 0
  /* margin:0; */
}
.author{
  left: 5%;
}
.playCount{
  right:5%
}
.desc p{
  height: 20vh;
  padding: 2vh;
  margin: 0;
  word-break: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>