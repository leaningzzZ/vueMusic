<template>
  <div class="container" v-loading="loading">
    <div class="top">
        {{this.listData.title}}
      <span class="topbar">返回</span>
      <span class="title">{{this.listData.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.loading=true;
    this.listId=this.$route.params.id,
    this.$api.get(`music/tencent/songList?key=579621905&id=${this.listId}`).then(res => {
      this.listData=res;
      this.loading=false
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
</style>