import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// GlobalComponent라는 이름으로 전역 컴포넌트를 불러옴
// import GlobalComponent from './components/global-component.vue'

/* 

  Vue.component(인자1, 인자2)
    - 첫 번째 인자는 global-component.vue에서 작성한 GlobalComponent의 요소 중 
      name 속성으로 작성한 이름으로 전역 컴포넌트를 html에서 등록한다.
    - 두 번째 인자는 위에서 import한 컴포넌트 객체

    즉, import한 컴포넌트 객체(인자2)를 name 속성에서 지정한 형태(인자1)로 사용한다.


  ※ localComponent는 globalComponent와 다르게, 
  main.js에 따로 등록할 필요가 없다.


  ★ vue-cli 실행 순서 ★

    1. public/index.html
    2. main.js
    3. App.vue
    4. components/...컴포넌트


*/


// Vue.component(GlobalComponent.name, GlobalComponent)
// Vue.component(ParentComponent.name, ParentComponent)

new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
