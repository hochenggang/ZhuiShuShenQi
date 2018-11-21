import Vue from 'vue';
import App from './App.vue';

import FisrtScreen from './components/FisrtScreen'
import MyBook from './components/MyBook';
import Finding from './components/Finding';
import Search from './components/Search';
import Reader from './components/Reader';
import FindingTarget from './components/FindingTarget'
import BookList from './components/BookList'

// 引入Vue的路由系统
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let Router = new VueRouter(
  {
    routes: [
      { path: '/', component: FisrtScreen },
      { path: '/mybook', component: MyBook },
      { path: '/finding', component: Finding},
      { path: '/finding/:target', component: FindingTarget},
      { path: '/search', component: Search},
      { path: '/booklist', component: BookList},
      { path: '/reader', component: Reader},
    ]
  }
)

Vue.config.productionTip = false;

// 渲染App组件并挂载到#app
new Vue({
  render: h => h(App),
  router:Router,
}).$mount('#app')

