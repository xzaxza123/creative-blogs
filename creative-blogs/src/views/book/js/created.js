//分页操作
export default{
created(){
    this.getarticles()
},
//主要用于home内容的获取以及功能书页的创建
beforeMount(){
    if (this.home.essay) {
        this.pageNum = Math.ceil(this.home.essay.length / this.pageSize);
                let length = this.home.essay.length
    
                let end =0
                let pageNum = this.pageNum
                if (length%7) {
                    end = length%7
                    this.totalPage[0] = this.home.essay.slice(0,end).reverse()
                    pageNum -= 1
    
                    for (let i = 0 ; i < pageNum; i++) {
                        this.totalPage[i+1] = this.home.essay.slice(this.pageSize * i+end, this.pageSize * (i + 1)+end).reverse()
                    }
                }else{
                    for (let i = 0 ; i < pageNum; i++) {
                        this.totalPage[i] = this.home.essay.slice(this.pageSize * i+end, this.pageSize * (i + 1)+end).reverse()
                    }
                }
    }

        //搜索导航页及导航内容页
        if (this.pageNum%2) {
            let homepages = this.pageNum+3
            this.homepages = this.pageNum+31   //home总页数
            this.currentPage ='p'+(homepages+30)
            this.searchPagenum = homepages+30
            this.searchcontentpage = 'p'+(homepages+31)
            this.searchcontentnum = homepages+31
        }else{
            this.homepages = this.pageNum+30   //home总页数
            this.currentPage ='p'+(this.pageNum+32)
            this.searchPagenum = this.pageNum+32
            this.searchcontentpage = 'p'+(this.pageNum+33)
            this.searchcontentnum = this.pageNum+33
        }

        
        //创作导航
        //在搜索导航后两页创建
        this.createdpage = 'p'+(this.searchPagenum + 10)
        this.creatednum = this.searchPagenum + 10
        this.createdpage2 = 'p'+(this.searchPagenum + 11)
        this.creatednum2 = this.searchPagenum + 11

        //创作编辑内容展示页
        //左页
        this.editleftpage = 'p'+(this.creatednum2 + 1)
        this.editleftpagenum = this.creatednum2 + 1
        //右页
        this.editrightpage = 'p'+(this.creatednum2 + 2)
        this.editrightpagenum = this.creatednum2 + 2

        // 我的导航左页
        this.minepage = 'p'+(this.editrightpagenum + 5)
        this.minepagenum = this.editrightpagenum + 5

        //我的页面内容导航展示页
        this.minenavshow = 'p'+(this.minepagenum + 1)
        this.minenavshownum = this.minepagenum + 1

        //内容展示页
        this.Contentshowleft = 'p'+(this.minenavshownum + 9)
        this.Contentshowleftnum = this.minenavshownum + 9
        this.Contentshowright = 'p'+(this.minenavshownum + 10)
        this.Contentshowrightnum = this.minenavshownum + 10

        //首页内容展示页
        this.homecontentpage1='p'+(this.Contentshowrightnum + 3)
        this.homecontentpagenum1=this.Contentshowrightnum + 3
        this.homecontentpage2='p'+(this.Contentshowrightnum + 4)
        this.homecontentpagenum2=this.Contentshowrightnum + 4
}
}