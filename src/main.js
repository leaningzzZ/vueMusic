import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper' //swiper移动端插件
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper,{loop: true,speed: 900,autoplay: {delay: 3000,disableOnInteraction: false},} )
//使用jsonp的库:jsonp(url,optional,callback)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
