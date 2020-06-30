import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import router from './router';
import store from './store/index';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(ElementUI);
locale.use(lang);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  App,
  render: (h) => h(App),
}).$mount('#app');
