import Vue from 'vue';
import App from './app.vue';

import FisrtScreen from './components/fisrtScreen'
import MyBook from './components/myBook';
import Finding from './components/finding';
import Search from './components/search';
import Reader from './components/reader/reader.vue';
import FindingTarget from './components/findingTarget';
import BookList from './components/bookList';

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

