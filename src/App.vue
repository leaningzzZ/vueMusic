<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <!-- <keep-alive>避免导航切换重复发送请求 -->
        <router-view/>
    <!-- </keep-alive> -->
    <player></player>
  </div>
</template>
<script>
import MyHeader from "./components/header/header"
import MyTab from "./components/tab/tab"
import player from "./components/player/player"
export default {
  components:{
    MyHeader,
    MyTab,
    player
  }
}
</script>
<style>
body{
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#ffffff;
  min-width: 370px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
