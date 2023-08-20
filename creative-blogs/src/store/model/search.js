//将查询获取到的数据列表展示在页面

const state = {
    Searchcontent:null,
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
  getSearchcontent(state,newvalue){
    state.Searchcontent = newvalue
  },
 } 
 
const actions = {
}

 export default{
    state,
    mutations,
}