<template>
    <div>推荐</div>
</template>
<script>
import {getRecommend} from "../../api/recommend.js"
import {ERR_OK} from "../../api/config.js"
export default {
    created(){
        console.log(1)
        this._getRecommend()
    },
    methods:{
        _getRecommend(){
            getRecommend().then((res)=>{
                console.log(res)
            })
        }
    }
}
</script>