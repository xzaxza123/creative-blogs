import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from "vue-cookies";
import {ElMessage} from 'element-plus'

//ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

//路由前置，在未登录状态下，进入创作或我的导航是暂停，跳转到注册页面
router.beforeEach((to,from,next)=>{
    let logined = store.getters.isLogin
    if (!logined) {
        if (to.name === 'create' || to.name === 'mine') {
            ElMessage({
                type: 'error',
                message: '请先注册或登录',
                duration:1000
            })
            return next({path:'/book/register'})
        }else{
            next()
        }
    }else{
        next()
    }
    
})

app.use(store).use(router).use(VueCookies).use(ElementPlus).mount('#app')