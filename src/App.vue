<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <router-view/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:rgba(0, 0, 0, 0.5)
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
