//我的导航
<template>
<div>
    <div>
      <el-avatar
        :size='95'
        :src="headshot"
      />
      <h2>{{ name }}</h2>
    </div>
    <div
     v-for="(item, index) of list"
     :key="index"
     class="div1"
    >
        <router-link :to="item.path">
          <h3>{{ item.name }}</h3>
        </router-link>
    </div>
    <button @click="LOGOUT">退出登录</button>
</div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    data () {
        return {
            //头像
            headshot:null,
            name:null,
            userid:null,
            //修改和文章
            list:[
                {
                    path: "/book/mine/amendinformation",
                    name: "修改信息",
                },
                {
                    path: "/book/mine/mypaper",
                    name: "我的文章",
                },
                {
                    path: "/book/mine/ChangepassView",
                    name: "修改密码",
                },
            ],
        }
    },
    methods:{
        ...mapMutations(['LOGOUT','changeshow','changewhichshow1','changewhichshow2','setsuccess']),
        ...mapActions(['getmypaper'])
    },
    created(){
        let num = sessionStorage.getItem('headshot');
        this.headshot = require(`../image/headshot/${num}.png`)
        this.name = sessionStorage.getItem('Loginedname');
        this.userid = sessionStorage.getItem('UserId');
    },
     beforeRouteUpdate (to, from) {
        if (to.name === 'ChangepassView') {
            this.changeshow(true)
        }else if (to.name === 'mypaper') {
            this.getmypaper(this.userid)
            this.changewhichshow1(true)
            this.changewhichshow2(false)
        }else if (to.name === 'amendinformation') {
            this.changewhichshow1(false)
            this.changewhichshow2(true)
        }
     },
     computed: {
        ...mapState(['mypaper','Deletearticle'])
     },
     watch: {
        'Deletearticle.success'(){
            this.getmypaper(this.userid)
            this.setsuccess(false)
        }
     }
}
</script>

<style lang="less" scoped>
.div1{
    width: 170px;
    height: 30px;
    margin-left: auto;
    margin-right: auto;
    a{
        text-decoration: none; /* 去除下划线 */
        color: black; /* 将字体颜色改为黑色 */
    }
}
button{
    margin-top: 20px;
}
</style>