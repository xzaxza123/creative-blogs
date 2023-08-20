import { createRouter, createWebHistory } from 'vue-router'
import InitialView from '../views/InitialView.vue'  //初始页
import cookies from "vue-cookies";

const routes = [
  {
    //初始页导航
    path: '/',
    name: 'initial',
    component: InitialView,
    meta: { preface : 0 },
    beforeEnter: (to, from) => {
      if (!cookies.get('online')) {
        cookies.set('online',1,60*60*24*7)
      }else{
        to.meta.preface = 1
      }
    },
  },
  {
    //书本导航
    path: '/book',
    name: 'book',
    component:import('../views/book/TurnView.vue'),
    children:[
      {
        //首页导航
        path:'home',
        name:'home',
        components:{home:import('../views/HomeView.vue')},
      },
      {
        //搜索导航
        path:'search',
        name:'search',
        components:{
          search : import('../views/SearchView.vue')
        }
      },
      {
        //创作导航
        path:'create',
        name:'create',
        components:{
          create:import('../views/CreateView.vue')
        }
      },
      {
        //我的导航
        path:'mine',
        name:'mine',
        components:{
          mine:import('../views/MineView.vue'),
          minefunctionView:import('../views/MinefunctionView.vue'),  //这里两个组件是作为跳板，将修改信息和我的文章内容展示在一级路由book中
          XiupassView:import('../views/XiupassView.vue'),
        },
        children:[
          {
            //修改信息
            path:'amendinformation',
            name:'amendinformation',
            components:{
              amendinformation:import('../views/AmendinformationView.vue'),
            }
          },
          {
            //修改密码
            path:'ChangepassView',
            name:'ChangepassView',
            components:{
              ChangepassView:import('../views/ChangepassView.vue'),
            }
          },
          {
            //我的文章
            path:'mypaper',
            name:'mypaper',
          }
        ]
      },
      {
        //注册导航
        path:'register',
        name:'register',
        components:{
          register:import('../views/RegisteredView.vue')
        }
      },
      {
        //登录导航
        path:'login',
        name:'login',
        components:{
          login:import('../views/LoginView.vue')
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router


