import $ from 'jquery'
import {mapActions, mapMutations} from 'vuex'
export default { 
    inject: ["reload"],
    methods: {
            // 初始动画放大
        	Test:function () {
                $('#book-zoom').transform('translate(' + 0 + 'px,' + 0 + 'px) '+'scale3d(' + 1 + ',' + 1 + ',1)')
                var flipbook = $('.sj-book');
                $('#book-zoom').removeClass('animate')

                if (this.online === 0) {
                    flipbook.turn('page', 4);
                }else{
                    this.Jumphome()
                }
        	},

            //添加刷新动画
            addanimate:function(){
                $('#book-zoom').transform('').addClass('animate').removeClass('book-zoom')
            },

            //离开书本缩小动画
        	Test2:function(){
        		var flipbook = $('.sj-book');
        		flipbook.turn('page', 1);
        
                    $('#book-zoom').
                      transform('translate(' + 0 + 'px,' + 0 + 'px) '+'scale3d(' + 0.4 + ',' + 0.4 + ',1)');
        	},

            //路由跳转致根路径时动画的执行时机与路由延迟跳转
            Leave:function () {
                        this.Test2()
                        this.showicon3 = false
                 this.settime=setTimeout(()=>{
                        this.fals = true
                        this.$router.push('/')
                    },1800)
            },

            //将第二页的元素溢出改为可溢出
            overflow:function () {
                $('.sj-book div[page=2]').css('overflow','visible');
                $('.sj-book div[page=2] div:eq(0)').css('overflow','visible')
            },

            //将倒数第二页的元素溢出改为可
            overflow2:function () {
                $('.sj-book div[page=251]').css('overflow','visible');
                $('.sj-book div[page=251] div:eq(0)').css('overflow','visible')
            },

            //除首次进入页面，其他时候从根页面跳转到home
            Jumphome:function () {
                var flipbook = $('.sj-book');
                let page =flipbook.turn('page')
                this.showicon3 = true
                if (page <= 30) {
                     let nextpage = setInterval(()=>{
                        flipbook.turn('page',page++)
                        if (page == 31) {
                            clearInterval(nextpage)
                            this.$router.push('/book/home')
                            this.changenavfals(true)
                        }
                    },50)
                }
            },

            
            //获取异步传来的数据
            ...mapActions(['getarticles','checkpaper','Deleteanarticle','checkhome1']),
            //获取vuex里面的同步函数
            ...mapMutations(['changedrawer','leftpageoverflow','rightpageoverflow','changeshowlogin','changeshowlogin2','changenavfals']),
            
            
            //前往home页面
            gohome:function () {
                var flipbook = $('.sj-book');
                flipbook.turn('page',30)
            },
            // 前往搜索导航页面
            gosearch:function(){
                var flipbook = $('.sj-book');
                flipbook.turn('page',this.searchPagenum)
            },

            // 前往创作导航页面
            gocreate:function(){
                var flipbook = $('.sj-book');
                flipbook.turn('page',this.creatednum)
            },

            goeditor(){
                var flipbook = $('.sj-book');
                flipbook.turn('page',this.editleftpagenum)
            },

            // 前往我的导航页面
            gomine:function(){
                var flipbook = $('.sj-book');
                flipbook.turn('page',this.minepagenum)
            },
            // 前往注册
            goregister(){
                this.changeshowlogin(true)
            },
            
            // 监听溢出
            leftpage(){
                const unwatch1 = this.$watch('contentheight1', ()=>{
                    console.log(this.contentheight1);
                    if (this.contentheight1 >=560 && this.contentheight1 <=595) {
                        this.leftpageoverflow(true)
                        unwatch1()
                    }else if(this.contentheight1 < 560){
                        this.leftpageoverflow(false)
                    }
                })
            },
            rightpage(){
                const unwatch2 = this.$watch('contentheight2', ()=>{
                    console.log(this.contentheight2);
                    if (this.contentheight2 >= 595  && this.contentheight2 <= 630) {
                        this.rightpageoverflow(true)
                        unwatch2()
                    }else if(this.contentheight2 <= 595){
                        this.rightpageoverflow(false)
                    }
                })
            },

            //切换导航改变图标
            addClassName: function(index) {
                this.num1 = index;
            },

            //局部刷新
            onSubmit() {
                this.reload(); //局部刷新
             },

             //查看文章
             check(value){
                this.checkpaper(value)
                setTimeout(()=>{
                    var flipbook = $('.sj-book');
                    this.Contentshowpage = flipbook.turn('page')
                    flipbook.turn('page',this.Contentshowleftnum)
                    this.title = this.checkpapers.paper.title
                    this.leftcontent = this.checkpapers.paper.leftcontent
                    this.rightcontent = this.checkpapers.paper.rightcontent
                },200)
            },

            //删除文章
            Delete(value){
                this.Deleteanarticle(value)
            },

            //查看首页内容
            chakanhome(value){
                this.checkhome1(value)
                setTimeout(()=>{
                    var flipbook = $('.sj-book');
                    this.homecurrentPage = flipbook.turn('page')
                    flipbook.turn('page',this.homecontentpagenum1)
                    this.hometitle = this.checkhome.paper.title
                    this.homeleftcontent = this.checkhome.paper.leftcontent
                    this.homerightcontent = this.checkhome.paper.rightcontent
                },100)
            },
            
    }
}