export default{
    data () {
        return {
            fals:false,
            settime:null,
            online:null,

            totalPage: [], // 所有分页的数据
            pageSize: 7, // 每页显示数量
            pageNum: null,  // 共几页=所有数据/每页现实数量     
            page:null,
            num:'p30',

            homepages:null, //home总页数
            currentPage: '', //搜索导航页码
            searchPagenum:null, //搜索导航页的页码

            searchpage:[],  //搜索内容的所有分页
            searchnum:9, //共几页
            searchcontentpage:'', //搜索内容的页码样式
            searchcontentnum:null, //搜索内容页码的数字

            //创作导航
            createdpage:'',
            creatednum:null,
            createdpage2:'',
            creatednum2:null,

            // 高度
            contentheight1:null,
            contentheight2:null,
            
            //导航链接
            list:[
                {
                    img1:require('../../../image/home1.png'),
                    img2:require('../../../image/home2.png'),
                    path: "/book/home",
                },
                {
                    img1:require('../../../image/search1.png'),
                    img2:require('../../../image/search2.png'),
                    path: "/book/search",

                },
                {
                    img1:require('../../../image/create1.png'),
                    img2:require('../../../image/create2.png'),
                    path: "/book/create",
                },
                {
                    img1:require('../../../image/mine1.png'),
                    img2:require('../../../image/mine2.png'),
                    path: "/book/mine",
                },
            ],
            num1: 0,
            mypaper2:[],
            mypapernum:5,
            
            //编辑内容展示页
            //左页
            editleftpage:'',
            editleftpagenum:null,
            //右页
            editrightpage:'',
            editrightpagenum:null,

            //我的页面基本导航左页
            minepage:'',
            minepagenum:null,

            //我的页面内容导航展示页
            minenavshow:'',
            minenavshownum:null,

            //内容展示页
            Contentshowleft:'',
            Contentshowleftnum:null,
            Contentshowright:'',
            Contentshowrightnum:null,

            //我的内容展示
            title:'',
            leftcontent:'',
            rightcontent:'',

            //内容展示时的当前页数
            Contentshowpage:null,

            //首页内容展示页
            homecontentpage1:'',
            homecontentpagenum1:'',
            homecontentpage2:'',
            homecontentpagenum2:'',
            homecurrentPage:null,

            //首页内容展示
            hometitle:'',
            homeleftcontent:'',
            homerightcontent:'',


            //打开编辑器按钮和关闭书本按钮的显示
            showeditorbtn:false,
            showicon3:false,
        }
    }
}