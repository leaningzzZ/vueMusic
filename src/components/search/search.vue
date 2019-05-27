<template>
    <div>
        <input type="text" v-model="keyword">
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
