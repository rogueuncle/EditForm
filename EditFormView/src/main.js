import Vue from 'vue'
import App from './App.vue'
import { Button, message,Col,Row,Divider,Table } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false


Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Divider);
Vue.use(Table);

Vue.prototype.$message = message;

new Vue({
  render: h => h(App),
}).$mount('#app')
