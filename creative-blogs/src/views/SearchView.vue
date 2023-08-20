//搜索
<template>
    <div>
        <h1>查找</h1>
        <!-- 搜索框 -->
        <div class="Searchbox">
            <input type="text" placeholder='请输入要搜索的内容' v-model="searchMsg" @blur='clear(searchMsg)'   @input="getcontent(searchMsg)" @keyup.enter="tosearch" ref="input"  />
            <svg @click="tosearch" t="1690600839391" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2278" data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200"><path d="M893.64 797.29L725.18 628.84c20.55-25.29 37.36-53.22 50.14-83.42 18.11-42.81 27.29-88.27 27.29-135.1 0-46.84-9.18-92.29-27.29-135.1-17.48-41.33-42.5-78.44-74.36-110.31-31.86-31.86-68.97-56.88-110.31-74.36-42.81-18.11-88.27-27.29-135.1-27.29s-92.29 9.18-135.1 27.29c-41.33 17.48-78.44 42.5-110.31 74.36s-56.88 68.97-74.36 110.31c-18.11 42.81-27.29 88.27-27.29 135.1 0 46.84 9.18 92.29 27.29 135.1 17.48 41.33 42.5 78.44 74.36 110.31s68.97 56.88 110.31 74.36c42.81 18.11 88.27 27.29 135.1 27.29s92.29-9.18 135.1-27.29a345.135 345.135 0 0 0 83.64-50.31l168.44 168.44c7.03 7.03 16.24 10.54 25.46 10.54s18.43-3.51 25.46-10.54c14.05-14.07 14.05-36.87-0.01-50.93zM455.55 685.37c-151.67 0-275.06-123.39-275.06-275.06s123.39-275.06 275.06-275.06c151.67 0 275.06 123.39 275.06 275.06s-123.4 275.06-275.06 275.06z" fill="#31D0C8" p-id="2279"></path></svg>
            <ul class="ul" v-show="ulisshow">
              <li v-for="item in matching.slice(matching.length-7, matching.length)" :key="item" class="li">
                  <a class="a" href="" @click.prevent="Jumpsearch(item.title)">{{item.title}}</a>
              </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import { throttle } from 'throttle-debounce'
export default {
    data () {
        return {
            searchMsg:'',  //input里面的值
            matching:[],   // 匹配的数组
            ulisshow:false,  //是否展示列表

            totalPage:[], //所有分页的数据
            pageSize: 7, // 每页显示数量
        }
    },
    methods:{
        //获取search.js里面的数据
         ...mapMutations(['getSearchcontent','getpagenum']),

        //节流
        getcontent:throttle(300,function(value){
            //搜索
            let queryStringArr = value.split("");
            let str = "(.*?)";
            let regStr = str + queryStringArr.join(str) + str;
            let reg = RegExp(regStr, "i");
            this.matching = this.home.essay.filter((item)=>{
                if (reg.test(item.title)) {
                    return item;
                }
            })

            //是否显示弹框
            this.ulisshow = value.length > 0 ? true : false

            if (value.length<=0) {
                this.totalPage = []
            }
        },{ noTrailing: false }),

        //搜索传递值到vuex再在书页拿到vuex数据
        tosearch:function(){
            this.ulisshow = false
            if (this.matching) {
                let pageNum = Math.ceil(this.matching.length / this.pageSize);


                for (let i = 0 ; i < pageNum; i++) {
                    this.totalPage[i] = this.matching.slice(this.pageSize * i, this.pageSize * (i + 1)).reverse()
                }
            }
            this.getSearchcontent(this.totalPage)
        },

        //搜索框弹窗的点击事件
        Jumpsearch(value){
            this.searchMsg = value
            setTimeout(()=>{
                this.tosearch()
            },300)
        },

        //清除上一次搜索的数据
        clear(value){
            if (value.length<=0) {
                this.totalPage = []
            }
        }

    },
    computed: {
        ...mapState(['home'])
    }
}
</script>

<style lang="less" scoped>
* {
        margin: 0;
        padding: 0;
}
div{
    .Searchbox{
        position: relative;
        border: 1px solid chartreuse;
        width: 350px;
        height: 27px;
        margin-left: 100px;
        border-radius: 10px;

        input{
            width: 350px;
            height: 27px;
            border: none;
            outline: none;
            box-sizing: border-box;
            padding: 0 45px 0 8px;
            border-radius: 10px;
        }

        input[type="text"]:focus {
          background-color: #fffef9;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        svg{
            position: absolute;
            width: 25px;
            height: 25px;
            right: 8px;
            top: 2px;
            align-items: center;
            justify-content: center;
            color: #c0c0c0;
            cursor: pointer;
        }

        .ul{
            list-style: none;
            padding-left:0px;
            background-color: #feeeed;
            position: absolute;
            top:29px;

            .li{
                .a{
                    display:block;
                    text-decoration: none;
                    color: black;
                    width: 340px;
                    height: 100%;
                    padding: 5px;
                }
                
                .a:hover{
                    background-color: #fffef9;
                }
            }
        }
    }


    
}

</style>