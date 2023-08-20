import $ from 'jquery'
export default{
    watch: {
        //监听搜索内容变化
        "search.Searchcontent"(value) {
            this.searchpage = value
        },
        //监听编辑展示页内容变化用于溢出判断
        'editor.html'(){
            this.contentheight1 = $('#editor1').innerHeight();
            if (this.contentheight1 >=560 && this.contentheight1 <=595) {
                this.leftpage()
            }
        },
        'editor.html2'(){
            this.contentheight2 = $('#editor2').innerHeight();
            if (this.contentheight2 >= 590  && this.contentheight2 <= 630){
                this.rightpage()
            }
        },
        //登录状态
        'login.logined'(){
            this.reload();
        },
        //我的文章内容变化
        'mypaper.mypaper1'(value){
            this.mypaper2 = value
        }
    }
}