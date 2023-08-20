//富文本编辑框的展示
import axios from "axios"

const state = {
    drawer:false,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
    //改变drawer的值是否显示模态框
  changedrawer(state,newvalue){
    state.drawer = newvalue
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