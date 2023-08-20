//导航的显示
import axios from "axios"

const state = {
    navfals:false,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
  //将异步数据赋值给essay
  changenavfals(state,newvalue){
    state.navfals = newvalue
  },
 } 
 
const actions = {
}

 export default{
    state,
    getters,
    mutations,
    actions
}