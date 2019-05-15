<template>
    <div>
        <audio :src="this.songUrl" controls></audio>
    </div>
</template>
<script>
export default {
    created(){
        console.log(this.$route.params.mid)
        this.$api.get(`tencent/url?id=${this.$route.params.mid}&isRedirect=0`).then(res=>{
            this.songUrl=res.data.data
        })
    },
    data(){
        return{
            songUrl:""
        }
    }
}
</script>