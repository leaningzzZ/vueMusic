<template>
    <div>
        <div class = "title">
            singerList
        </div>
        <div class="singerList">
            <ul>
                <li v-for="item in singerData.singerList.data" :key="item.id">


                </li>

            </ul>
        </div>
    </div>
</template>

<script>
import { getRecommend } from "../../api/recommend.js";
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