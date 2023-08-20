import {mapState} from 'vuex'
export default{
    computed:{
        ...mapState(['home','search','editor','login','nav','mypaper','checkpapers','checkhome'])
    },
}