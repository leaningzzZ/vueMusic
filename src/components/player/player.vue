<template>
    <div>
        <audio :src="this.$route.params.url" controls></audio>
    </div>
</template>
<script>
export default {
    created(){
        console.log(this.$route.params.id)
        this.$api.get(`tencent/url?id=${this.$route.params.id}&quality=128`).then(res=>{
            console.log(res)
        })
    }
}
</script>