<template>
    <div class="tabs">
        <router-link  tag="div" class="tab-item" active-class="active" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link  tag="div" class="tab-item" active-class="active" to="/singer">
            <span class="tab-link">歌手</span>
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
    color:#919191;
    flex-grow:1;
    height: 4vh;
    line-height: 4vh;
}

.active{
    color:#31c27c;
    border-bottom: 2px solid #32c27c;
}
</style>
