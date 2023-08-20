//我的导航中我的文章列表
import axios from "axios"
import {ElMessage} from 'element-plus'
const state = {
    mypaper1:null,
    whichshow1:null,
    whichshow2:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
    getmypaper1(state,newvalue){
        let pageSize =5
        let pageNum = Math.ceil(newvalue.length / pageSize);
        let totalPage = []
        for (let i = 0 ; i < pageNum; i++) {
            totalPage[i] = newvalue.slice(pageSize * i, pageSize * (i + 1)).reverse()
        }
        state.mypaper1 = totalPage
    },
    changewhichshow1(state,newvalue){
        state.whichshow1 = newvalue
    },
    changewhichshow2(state,newvalue){
        state.whichshow2 = newvalue
    },
 } 
 
const actions = {
    async getmypaper(context,value){
        const msg = await axios.get('http://localhost:8081/getmypaper.php',{
            params:{
                userid:value
            }
        })
        if (msg.data === 0) {
            ElMessage({
              type: 'error',
              message: '您还没有写入内容',
              duration:1000
            })
          }else {
            ElMessage({
              type: 'success',
              message: '查询成功',
              duration:1000
            })
            context.commit('getmypaper1',msg.data)
          }
    }
}

 export default{
    state,
    getters,
    mutations,
    actions
}