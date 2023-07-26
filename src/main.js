import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue} from 'bootstrap-vue'
import store from './store/store'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'






const app = createApp(App)

router.beforeEach((to, from, next) => {
  if(to.name!=="login"){
    console.log(localStorage.getItem("token"))
    
    if (localStorage.getItem("token") == null) {
      
     return next({ name: 'login' })

    } else {

       return next()
    
    }
  }
  else{ return next()}

})


app.use(router).use(store).use(BootstrapVue).mount('#app')
