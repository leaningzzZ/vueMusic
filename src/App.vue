<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <keep-alive><!-- 避免导航切换重复发送请求 -->
        <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import MyHeader from "./components/header/header"
import MyTab from "./components/tab/tab"
export default {
  components:{
    MyHeader,
    MyTab
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
