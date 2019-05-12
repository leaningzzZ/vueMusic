<template>
    <div class="tabs">
        <router-link  tag="div" class="tab-item" active-class="active" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link  tag="div" class="tab-item" active-class="active" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link  tag="div" class="tab-item" active-class="active" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link  tag="div" class="tab-item" active-class="active" to="/search">
            <span class="tab-link">搜索 </span>
        </router-link>
    </div>
</template>
<script>
export default {
    
}

</script>
<style>
.tabs{
    display: flex
}
.tab-item{
    flex-grow:1;
    height: 5vh;
}
.active{
    color:black;
    border-bottom:2px solid white
}
</style>
