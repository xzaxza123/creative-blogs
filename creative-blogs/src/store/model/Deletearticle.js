//删除我的某一个文章
import axios from "axios"
import {ElMessage} from 'element-plus'
const state = {
    success:false,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
    setsuccess(state,newvalue){
        state.success = newvalue
      }
 } 
 
const actions = {
    async Deleteanarticle(context,value){
        const msg = await axios.get('http://localhost:8081/Deleteanarticle.php',{
            params:{
                paperid:value
            }
        })
        if (msg.data === 0) {
            ElMessage({
              type: 'error',
              message: '删除失败',
              duration:1000
            })
          }else {
            ElMessage({
              type: 'success',
              message: '删除成功',
              duration:1000
            })
            context.commit('setsuccess',true)
          }
    }
}

 export default{
    state,
    getters,
    mutations,
    actions
}