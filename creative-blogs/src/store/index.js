import { createStore } from 'vuex'
import home from "./model/home.js"
import search from "./model/search.js"
import create from "./model/create.js"
import editor from './model/editor.js'
import login from './model/login.js'
import nav from './model/nav.js'
import submit from './model/submit.js'
import change from './model/change.js'
import mypaper from './model/mypaper.js'
import checkpapers from './model/checkpapers.js'
import Deletearticle from './model/Deletearticle.js'
import checkhome from './model/checkhome.js'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    search,
    create,
    editor,
    login,
    nav,
    submit,
    change,
    mypaper,
    checkpapers,
    Deletearticle,
    checkhome
  }

})
