//登录成功将数据保存到sessionStorage中或注册
import axios from "axios"
import qs from 'qs'
import {ElMessage} from 'element-plus'
const state = {
    showregiste:false,
    showlogin:false,
    registestate:0,

    //登录状态
    logined: false,
    Loginedname: null,   // 用户名
    UserId: null,  // 用户id
    headshot:null, // 头像
    emali:null, // 邮箱
 }
 
const getters = {
  isLogin (state) {
    if (!state.logined) {    
        state.logined=sessionStorage.getItem('logined');   //从sessionStorage中读取状态
        state.Loginedname=sessionStorage.getItem('Loginedname');
        state.UserId=sessionStorage.getItem('UserId');
        state.headshot=sessionStorage.getItem('headshot');
        state.emali=sessionStorage.getItem('emali');
    }
    return state.logined
}
}

const mutations = {
  changeshowlogin(state,newvalue){
    state.showregiste = newvalue
  },
  changeshowlogin2(state,newvalue){
    state.showlogin = newvalue
  },
  registesuccess(state,newvalue){
    state.registestate = newvalue
  },
  //登入
  LOGIN (state,user) {
    // 若只是改变state里的值，在强制刷新后会丢失，数据添加到sessionStorage里
    sessionStorage.setItem("Loginedname", user.username)  // 用户名
    sessionStorage.setItem("UserId", user.userid)   // 用户id
    sessionStorage.setItem("headshot", user.headshot)   // 头像数据
    sessionStorage.setItem("logined", true)  // 登录状态
    sessionStorage.setItem("emali", user.email)  // 邮箱
    state.Loginedname = user.username
    state.UserId = user.userid
    state.headshot = user.headshot
    state.emali = user.email
    state.logined = true
   },
  // 登出
 LOGOUT (state) {
  // 这个同理
  sessionStorage.removeItem("Loginedname")
  sessionStorage.removeItem("UserId")  
  sessionStorage.removeItem("logined")
  sessionStorage.removeItem("emali")
  state.Loginedname = ''
  state.UserId = ''
  state.emali = ''
  state.logined = null
 }
} 
 
const actions = {
  async getregistered(context,value){
    let data = qs.stringify({
      tab : JSON.stringify(value)
    });
    const msg = await axios.post('http://localhost:8081/registered.php', data)
    if (msg.data === 606) {
      ElMessage({
        type: 'error',
        message: '当前用户名已经被使用',
        duration:1000
      })
    }else if (msg.data === 707) {
      ElMessage({
        type: 'error',
        message: '当前邮箱已被注册，请登录',
        duration:1000
      })
    }else if (msg.data === 1) {
      ElMessage({
        type: 'success',
        message: '注册成功,请登录',
        duration:1000
      })
      context.commit('registesuccess',1)
    }
    },
    async getlogin(context,value){
      let data = qs.stringify({
        tab : JSON.stringify(value)
      });
      const msg = await axios.post('http://localhost:8081/login.php', data)
      if (msg.data === 101) {
        ElMessage({
          type: 'error',
          message: '登录失败，用户名或密码不正确',
          duration:1000
        })
      }else {
        ElMessage({
          type: 'success',
          message: '登录成功',
          duration:1000
        })
        context.commit('LOGIN',msg.data)
        context.commit('changeshowlogin2',false)
      }
      },
}

 export default{
    state,
    getters,
    mutations,
    actions
}