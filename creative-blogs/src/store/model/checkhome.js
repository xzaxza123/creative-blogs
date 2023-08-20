//获取首页及搜索单个文章的内容
import axios from "axios"
import {ElMessage} from 'element-plus'
const state = {
    paper:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
    getpaperhome(state,newvalue){
        state.paper = newvalue[0]
    }
 } 
 
const actions = {
    async checkhome1(context,value){
        const msg = await axios.get('http://localhost:8081/checkpaper.php',{
            params:{
                paperid:value
            }
        })
        context.commit('getpaperhome',msg.data)
    }
}

 export default{
    state,
    getters,
    mutations,
    actions
}