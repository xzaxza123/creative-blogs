// 将富文本编辑中写好的数据提交
import axios from "axios"
import qs from 'qs'
import {ElMessage} from 'element-plus'
const state = {
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
} 
 
const actions = {
    async submitpaper(context,value){
        let data = qs.stringify({
            tab : JSON.stringify(value)
        });
        const msg = await axios.post('http://localhost:8081/submitting.php',data)
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
          }
    },
}

 export default{
    state,
    getters,
    mutations,
    actions
}