export default{
    //路由即将跳转时执行动画函数
    beforeRouteLeave(to, from,next) {
               this.Leave()
               setTimeout(()=>{
                   clearInterval(this.settime)
               },1900)
       next(this.fals)
     },
     // 进入book时的动画判断
     beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.online = from.meta.preface
        })
     },
     //路由跳转的翻页
     beforeRouteUpdate (to, from) {
        if (to.name === 'home') {
            this.gohome()
            if (from.name === 'register' || from.name === 'login') {
                let index = 0
                this.addClassName(index)
            }
        }else if (to.name === 'search') {
            this.gosearch()
            if (from.name === 'register' || from.name === 'login') {
                let index = 1
                this.addClassName(index)
            }
        }else if (to.name === 'create') {
            this.gocreate()
            if (from.name === 'register' || from.name === 'login') {
                let index = 2
                this.addClassName(index)
            }
        }else if (to.name === 'mine') {
            this.gomine()
            if (from.name === 'login') {
                let index = 4
                this.addClassName(index)
            }
        }else if (to.name === 'register') {
            this.goregister()
        }
     }
}