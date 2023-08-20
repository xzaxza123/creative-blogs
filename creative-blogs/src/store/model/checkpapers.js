//获取我的导航里面我的文章数据
import axios from "axios"
import {ElMessage} from 'element-plus'
const state = {
    paper:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
    getpaper(state,newvalue){
        state.paper = newvalue[0]
    }
 } 
 
const actions = {
    async checkpaper(context,value){
        const msg = await axios.get('http://localhost:8081/checkpaper.php',{
            params:{
                paperid:value
            }
        })
        context.commit('getpaper',msg.data)
    }
}

 export default{
    state,
    getters,
    mutations,
    actions
}