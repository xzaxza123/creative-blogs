//首页内容的获取
import axios from "axios"

const state = {
    essay:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
  //将异步数据赋值给essay
  setarticles(state,newvalue){
    state.essay = newvalue
    console.log(state.essay);
  },
 } 
 
const actions = {
    async getarticles(context){
        const msg = await axios.get('http://localhost:8081/getarticles.php')
        context.commit('setarticles',msg.data)
        }
}

 export default{
    state,
    getters,
    mutations,
    actions
}