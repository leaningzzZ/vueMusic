<template>
    <div>
        <!-- <div class = "title">
            singerList
        </div> -->
        <div class="singerList">
            <ul>
                <li v-for="item in singerData.singerList" :key="item.id"  @touchstart="singerListClicked(($event))"  @touchend="singerListNoClicked(($event))">
                    <div class="singerListItem" >
                        <div class="singerListPic" >
                            <img :src="item.singer_pic" alt="">
                        </div>
                        <div class="listSingerName">
                            <p>{{item.singer_name}}</p>
                        </div>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
// import { getRecommend } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config.js";
export default{
    created() {
        this.getSingerList();
        this.listLoading = false;
    },
    methods:{
        getSingerList(){
          this.listLoading = true;
          this.$api
            .get(
              "tencent/artist/list?page=0&pageSize=30"
            )
            .then(res => {
                this.singerData.singerList = res.data.data;
                this.listLoading = false;
                console.log(this.singerData.singerList)
            });
        },
        singerListClicked: function(event){
            var el = event.currentTarget;
            el.style.backgroundColor="#c5c5c5";
        },
        singerListNoClicked: function(event){
            var el = event.currentTarget;
            el.style.backgroundColor="#ffffff";
        }
    },
    
    data(){
        return {
            singerData:{
                slider:[],
                singerList:[]
            },
            loading:false
        };
    }
};
</script>

<style>
.singerListItem{
    border-bottom: 0.5px #c5c5c5 solid;
    position: relative;
    height: 50px;
}

.singerList ul{
    list-style: none;
    margin: 0;
    padding: 0;
}

.singerList ul li{
    height: 50px;
}


.singerListPic{
    display: inline-block;
    float: left;
    height: 50px;
    box-sizing: border-box;
    padding-top: 5px;
    padding-left: 10px;
}
.singerListPic img{
    width:40px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.listSingerName{
    display: inline-block;
    float: left;
}
.listSingerName p{
    /* display: inline-block; */
    font-size: 14px;
    line-height: 50px;
    padding: 0;
    margin: 0;
    padding-left: 20px;
}

.el-icon-arrow-right{
    position: absolute;
    right: 0px;
    top:17px;
    margin: auto;
    display: inline-block;
    padding-right: 10px;
    color:#919191;
}
</style>