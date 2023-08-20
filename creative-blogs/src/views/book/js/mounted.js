import $ from 'jquery'
import turn from '@/utils/turn'
import { ElMessage } from 'element-plus'

export default {
    mounted(){
        let that = this;
        //点击按钮执行动画路由指向'/'
        $('#btn').click(function(){
            setTimeout(()=>{
                that.Leave()
                setTimeout(()=>{
                    clearInterval(that.settime)
                },1900)
            },0)
        })
        
        //根路由跳转到book执行的动画
        setTimeout(()=>{
            this.Test()
        },0)
        
        // 动画结束后执行刷新动画,并结束跳转动画
        setTimeout(() => {
            this.addanimate()
          }, 2100);



        //书本的创建以及一些操作
        function loadApp() {

            // 键盘左右翻书效果
            $(document).keydown(function(e){
                var previous = 37, next = 39;
                switch (e.keyCode) {
                    case previous:
                        $('.sj-book').turn('previous');
                    break;
                    case next:
                    $('.sj-book').turn('next');
                    break;
                }
            });     
    
        // Flipbook
        var flipbook = $('.sj-book');

        //创建图书
        flipbook.turn({
            elevation: 50,
            autoCenter: true,
            gradients: true,
            duration: 1000,
            pages: 252,
            when: {

                turning: function(e, page, view) {
                    var book = $(this),currentPage = book.turn('page'),pages = book.turn('pages');
    
                    //现知道的功能是实现结束动画之前跳转到第一页
                    if (currentPage>3 && currentPage<pages-3) {
                        if (page==1) {
                            book.turn('page', 2).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        } else if (page==pages) {
                            book.turn('page', pages-1).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        }
                    } else if (page>3 && page<pages-3) {
                        if (currentPage==1) {
                            book.turn('page', 2).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        } else if (currentPage==pages) {
                            book.turn('page', pages-1).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        }
                    }
    
                    updateDepth(book, page);
                    //添加页两侧的分线
                    if (page>=2)
                        $('.sj-book .p2').addClass('fixed');
                    else
                        $('.sj-book .p2').removeClass('fixed');
    
                    if (page<book.turn('pages'))
                        $('.sj-book .p251').addClass('fixed');
                    else
                        $('.sj-book .p251').removeClass('fixed');

                    //设置不可翻到30页之前
                    if (currentPage==30  && page == 29  || currentPage==31 && page == 29 ) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }

                    //设置首页内容的最后一页不可翻动
                    if (currentPage== that.homepages-2 && page == that.homepages || currentPage== that.homepages-1 && page == that.homepages) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }

                    //设置搜索框页面不可翻至前一页
                    if (currentPage== that.searchPagenum && page == that.searchPagenum-1) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }

                    //设置搜索到内容的最后一页不可翻动(问题：只能触发一次，不能动态)
                    let searchpages = null
                    let length = that.searchpage.length
                    if (length%2) {
                        searchpages = length+that.searchcontentnum
                    }else{
                        searchpages = length+that.searchcontentnum+1
                    }
                    if (currentPage%2) {
                        if (currentPage== searchpages-1 && page == searchpages) {
                                book.turn('stop')
                                e.preventDefault();
                                ElMessage({
                                    showClose: true,
                                    message: '没有更多内容了哦',
                                    type: 'warning',
                                    duration:1000
                                })
                                return;
                            }
                    }else{
                        if (currentPage== searchpages-2 && page == searchpages) {
                            book.turn('stop')
                            e.preventDefault();
                            ElMessage({
                                showClose: true,
                                message: '没有更多内容了哦',
                                type: 'warning',
                                duration:1000
                            })
                            return;
                        }
                    }

                    // 创作前页不可翻动
                    if (currentPage== that.creatednum && page == that.creatednum-1 || currentPage== that.creatednum+1 && page == that.creatednum-1) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }
                    //编辑内容展示右页不可翻动
                    if (currentPage== that.editleftpagenum && page == that.editrightpagenum+1) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }


                    //我的页面左页不可翻动
                    if (currentPage== that.minepagenum && page == that.minepagenum-1 || currentPage== that.minepagenum+1 && page == that.minepagenum-1) {
                        book.turn('stop')
                        e.preventDefault();
                        ElMessage({
                            showClose: true,
                            message: '没有更多内容了哦',
                            type: 'warning',
                            duration:1000
                        })
                        return;
                    }

                    //我的页面修改信息展示不可翻动
                        if (that.mypaper.whichshow1) {
                            let mypaperpages = null
                            let lelngth = that.mypaper2.length
                            if (lelngth%2) {
                                mypaperpages = lelngth+that.minenavshownum
                            }else{
                                mypaperpages = lelngth+that.minenavshownum+1
                            }
                            if (currentPage%2) {
                                if (currentPage== mypaperpages-1 && page == mypaperpages) {
                                        book.turn('stop')
                                        e.preventDefault();
                                        ElMessage({
                                            showClose: true,
                                            message: '没有更多内容了哦',
                                            type: 'warning',
                                            duration:1000
                                        })
                                        return;
                                    }
                            }else{
                                if (currentPage== mypaperpages-2 && page == mypaperpages) {
                                    book.turn('stop')
                                    e.preventDefault();
                                    ElMessage({
                                        showClose: true,
                                        message: '没有更多内容了哦',
                                        type: 'warning',
                                        duration:1000
                                    })
                                    return;
                                }
                            }
                        }else if (that.mypaper.whichshow2) {
                            if (currentPage== that.minenavshownum && page == that.minenavshownum+1 || currentPage== that.minenavshownum-1  && page == that.minenavshownum+1) {
                                book.turn('stop')
                                    e.preventDefault();
                                    ElMessage({
                                        showClose: true,
                                        message: '没有更多内容了哦',
                                        type: 'warning',
                                        duration:1000
                                    })
                                return;
                            }
                        }else{
                            if (currentPage== that.minenavshownum  && page == that.minenavshownum+1 || currentPage== that.minenavshownum-1  && page == that.minenavshownum+1) {
                                book.turn('stop')
                                    e.preventDefault();
                                    ElMessage({
                                        showClose: true,
                                        message: '没有更多内容了哦',
                                        type: 'warning',
                                        duration:1000
                                    })
                                return;
                            }
                        }

                    //我的文章页面右页不可翻动
                    if (currentPage== that.Contentshowrightnum-1  && page == that.Contentshowrightnum+1) {
                        book.turn('stop')
                            e.preventDefault();
                            ElMessage({
                                showClose: true,
                                        message: '没有更多内容了哦',
                                type: 'warning',
                                duration:1000
                            })
                        return;
                    }

                    //左页翻动返回之前页
                    if (currentPage == that.Contentshowleftnum && page == that.Contentshowleftnum-1) {
                        book.turn('stop').turn('page', that.Contentshowpage);
                            e.preventDefault();
                        return;
                    }

                    //首页内容展示右页不可翻动
                    if (currentPage== that.homecontentpagenum2-1  && page == that.homecontentpagenum2+1) {
                        book.turn('stop')
                            e.preventDefault();
                            ElMessage({
                                showClose: true,
                                        message: '没有更多内容了哦',
                                type: 'warning',
                                duration:1000
                            })
                        return;
                    }
                    //左页翻动返回之前页
                    if (currentPage == that.homecontentpagenum1 && page == that.homecontentpagenum1-1) {
                        book.turn('stop').turn('page', that.homecurrentPage);
                            e.preventDefault();
                        return;
                    }

                    //打开编辑器按钮的展示于隐藏
                    if (page === that.editleftpagenum || page === that.edirightpagenum) {
                        that.showeditorbtn = true
                    }else{
                        that.showeditorbtn = false
                    }
                    console.log("page:"+page);
                    console.log('currentPage:'+currentPage);
                        
                },
    
                //通过动画进入书本之后，右下角的翻页
                turned: function(e, page, view) {
                    var book = $(this);
                    if (page==2 || page==3) {
                        book.turn('peel', 'br');
                    }
                    //调用元素溢出函数
                    that.overflow()
                    that.overflow2()
                    updateDepth(book);

                },
    
    
    
                //添加书页
                missing: function (e, pages,page) {
                    //循环执行插入函数addPage
                    for (var i = 0; i < pages.length; i++) {
                        addPage(pages[i], $(this));
                    }
                }
            }
            
        });
    
        //添加book页面书本刷新时的左移动画
        flipbook.addClass('animated');
    }
        //调用loadApp()函数完成turn.js初始化
        loadApp()
    
        //书本内容左边的一页一页的那个设置
        function updateDepth(book, newPage) {
    
            var page = book.turn('page'),
                pages = book.turn('pages'),
                depthWidth = 16*Math.min(1, page*2/pages);  //书本页面左边深度
                
                newPage = newPage || page;
    
            if (newPage>3)
                $('.sj-book .p2 .depth').css({
                    width: depthWidth,
                    left: 20 - depthWidth
                });
            else
                $('.sj-book .p2 .depth').css({width: 0});
    
                depthWidth = 16*Math.min(1, (pages-page)*2/pages);
    
            if (newPage<pages-3)
                $('.sj-book .p251 .depth').css({
                    width: depthWidth,
                    right: 20 - depthWidth
                });
            else
                $('.sj-book .p251 .depth').css({width: 0});
    
        }
    
          
        //获取书页内容
        function addPage(page, book) {
          if (!book.turn('hasPage', page)) {
            var element = $('<div/>',{'class': 'own-size disable',css: {width: 555, height: 684}}).html(`<div class="loader"></div>`);

            if (book.turn('addPage', element, page)) {
                loadPage(page);
            }
          }
        }


        function loadPage(page) {
            that.page = page
            //添加页码
            setTimeout(()=>{
                $('.p' + page).html(`<span class="page-number">${page}</span>`);
            },30)
        }



        //关闭书本
        $('#btn2').click(function(){
            HomeContent()
        })


    },
}