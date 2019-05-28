<template>
    <div>
        <el-input class="search" placeholder="搜索歌曲丶歌单丶专辑" prefix-icon="el-icon-search"  v-model="keyword" v-on:keyup.enter="search(keyword)" > </el-input>
        <button @click="search(keyword)">搜索</button>
    </div>

</template>

<script>
export default {
    data(){
        return{
            keyword:""
        }
    },
    methods:{
        search(keyword){
            let searchStorage=window.localStorage;
            searchStorage.keyword=keyword;
            this.$router.push({name: 'searchResult'})
        }
    }
}
</script>

<style>

input{
    /* width: 100%; */
    font-size: 15px;
}


</style>
