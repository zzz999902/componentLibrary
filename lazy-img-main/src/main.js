import Vue from 'vue';
import App from './App.vue';
import "./mock";
import './eventBus';
Vue.config.productionTip = false;
// 注册全局指令
import vLazy from './directives/lazy';
Vue.directive('lazy', vLazy);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
