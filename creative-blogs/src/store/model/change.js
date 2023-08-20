//修改用户信息以及密码
import axios from "axios"
import qs from 'qs'
import {ElMessage} from 'element-plus'
const state = {
    show:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
  //使修改密码的弹出框展示
    changeshow(state,newvalue){
        state.show = newvalue
    },
    //信息修改成功后将sessionStorage中的数据更新
    changesessionStorage (state,user) {
        // 若只是改变state里的值，在强制刷新后会丢失，数据添加到sessionStorage里
        sessionStorage.setItem("Loginedname", user.name)  // 用户名
        sessionStorage.setItem("headshot", user.headshot)   // 头像数据
        sessionStorage.setItem("emali", user.emali)  // 邮箱
    },
 } 
 
const actions = {
  //修改信息
    async changename(context,value){
        let data = qs.stringify({
            tab : JSON.stringify(value)
        });
        const msg = await axios.post('http://localhost:8081/changename.php',data)
        if (msg.data === 0) {
            ElMessage({
              type: 'error',
              message: '提交失败',
              duration:1000
            })
          }else {
            ElMessage({
              type: 'success',
              message: '提交成功',
              duration:1000
            })
            context.commit('changesessionStorage',value)
          }
    },
    //修改密码
    async changepass(context,value){
        let data = qs.stringify({
            tab : JSON.stringify(value)
        });
        const msg = await axios.post('http://localhost:8081/changepass.php',data)
        if (msg.data === 0) {
            ElMessage({
              type: 'error',
              message: '修改失败',
              duration:1000
            })
          }else {
            ElMessage({
              type: 'success',
              message: '修改成功，请重新登录',
              duration:1000
            })
          }
    },
}

 export default{
    state,
    mutations,
    actions,
    getters
}