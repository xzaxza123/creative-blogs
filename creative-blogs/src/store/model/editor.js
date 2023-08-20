//富文本编辑器中数据的获取，用于展示到编辑时的左右页上
const state = {
    html:null,
    title:null,
    html2:null,
    leftoverflow:false,
    rightoverflow:false
 }
 
const getters = {
  
}

// 同步修改数据
const mutations = {
  gethtml(state,newvalue){
    state.html = newvalue
  },
  gethtml2(state,newvalue){
    state.html2 = newvalue
  },
  changetitle(state,newvalue){
    state.title = newvalue
  },
  leftpageoverflow(state,newvalue){
    state.leftoverflow = newvalue
  },
  rightpageoverflow(state,newvalue){
    state.rightoverflow = newvalue
  },
 } 
 
const actions = {
}

 export default{
    state,
    mutations,
}