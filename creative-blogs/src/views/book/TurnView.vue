<template>
<div>
	<!-- 关闭按钮 -->
	<svg t="1692426965435" class="icon3" v-show="showicon3" id="btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4141" width="200" height="200"><path d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" fill="#444444" p-id="4142"></path></svg>
	
	<!-- 书本 -->
	<div id="canvas">
	<div id="book-zoom" class="book-zoom">
		<div class="sj-book">
			<div depth="5" class="hard"><div class="side"></div> </div>
			<div depth="5" class="hard front-side navfather">
					<nav v-show="nav.navfals">
						<div
						v-for="(item, index) in list"
					    :key="index"
						@click="addClassName(index)"
						>
		                <router-link :to="item.path">
                           <img :src="item.img1"  width="180" height="38" class="img" :class="{active: num1 === index}">
                           <img :src="item.img2"  width="200" height="45" class="img" :class="{active: num1 != index}">
						</router-link><br>
						</div>
	                </nav>
				<div class="depth"></div>
			</div>

			<!-- 前言页 -->
			<div class="own-size p4">
				<div class="loader paper">
					<PrefacePage/>
				</div>
			</div>

			<div class="own-size p5">
				<div class="loader paper">
					<button @click="Jumphome">前往首页</button>
				</div>
			</div>

            <!-- home内容 -->
             <div class="own-size" :class="[num]" v-for="iten1 in pageNum" :key = 'iten1' >
				<div class="loader">
					<a href="javascript:void(0)" v-for="iten in totalPage[--iten1]" :key="iten" @click="chakanhome(iten.paperid)" class="row">
                        <div class="div">
							<img :src="iten.coverimg" width="120" height="80">
                            <h3>{{iten.title}}</h3>
							<span>{{ iten.textarea }}</span>
                        </div>
                    </a> 
				</div>
			</div>

            <!-- 搜索页面 -->
			<div class="own-size" :class="[currentPage]">
				<div class="loader">
					<router-view name="search"/>
				</div>
			</div>

            <!-- 搜索内容 -->
			<div class="own-size" :class="[searchcontentpage]" v-for="iten in searchnum" :key = 'iten'>
				<div class="loader">
					<a href="javascript:void(0)" v-for="item in searchpage[searchnum-iten]" :key="item" @click="chakanhome(item.paperid)" class="row">
                        <div class="div">
                            <img :src="item.coverimg" width="120" height="80">
                            <h3>{{item.title}}</h3>
							<span>{{ item.textarea }}</span>
                        </div>
                    </a>
				</div>
			</div>

			<!-- 创作模态框 -->
			<div class="own-size" :class="[createdpage2]">
				<div class="loader">
					<el-button type="primary" style="margin-top: 16px" @click="goeditor()">
                       打开编辑页面
                    </el-button>
				</div>
			</div>

            <!-- // 草稿内容展示页 -->
			<div class="own-size" :class="[createdpage]">
				<div class="loader">
					<p>这里可以写对富文本编辑器功能的一些介绍</p>
				</div>
			</div>

			<!-- 编辑展示页 -->
			<!-- //左页 -->
			<div class="own-size" :class="[editleftpage]">
				<div class="loader paper">
					<div class="title">
					<h3 class="h3">{{ editor.title }}</h3>
					</div>
					<div class="content" id="editor1">
					<span v-html="editor.html" class="content"></span>
					</div>
				</div>
			</div>
			<!-- //右页 -->
			<div class="own-size" :class="[editrightpage]">
				<div class="loader paper">
					<div class="content2" id="editor2">
					<span v-html="editor.html2" class="content"></span>
					</div>
				</div>
			</div>

            <!-- 我的导航内容展示 -->
			<div class="own-size" :class="[minepage]">
				<div class="loader">
					<router-view name="mine"/>
				</div>
			</div>

            <!-- 展示我的导航中我的文章和修改信息 -->
			<div class="own-size" v-for="iten in mypapernum" :key = 'iten' :class="[minenavshow]">
				<div class="loader">
					<div v-if="mypaper.whichshow1">
					  <span  v-for="item in mypaper2[mypapernum-iten]" :key="item">
                        <div class="div2">
                            <img :src="item.coverimg" width="120" height="100">
                            <h3>{{item.title}}</h3>
							<span>{{ item.textarea }}</span>
					        <svg t="1692344232514" class="icon" @click="check(item.paperid)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4086" width="200" height="200"><path d="M607.839811 895.957102H214.69447A86.82497 86.82497 0 0 1 127.880338 809.070721V214.784781A86.839419 86.839419 0 0 1 214.69447 127.880338h594.28594a86.33729 86.33729 0 0 1 61.436749 25.456857c16.400473 16.400473 25.362934 38.208767 25.373771 61.411462L894.439878 607.821749v0.10476a32.031496 32.031496 0 0 0 64.059379 0.101149L959.825022 214.889542v-0.104761A150.775976 150.775976 0 0 0 808.98041 63.940169H214.69447A150.638703 150.638703 0 0 0 63.940169 214.784781v594.28594a150.638703 150.638703 0 0 0 150.757914 150.82655h393.141728a31.970084 31.970084 0 0 0 0-63.940169z" fill="" p-id="4087"></path><path d="M950.544667 905.331381l-122.071536-122.071536a192.217875 192.217875 0 1 0-45.213286 45.213286l122.071536 122.071536a31.970084 31.970084 0 0 0 45.213286-45.213286z m-278.547941-105.302594a128.028448 128.028448 0 1 1 90.531332-37.497116 127.193975 127.193975 0 0 1-90.527719 37.497116zM768.004516 352.212795c17.653989 0 31.966472-14.402794 31.970084-32.056783s-14.308871-32.074845-31.966472-32.078457L256.002709 287.911382a32.020659 32.020659 0 0 0-31.970084 32.024271c0 17.657601 14.308871 32.092907 31.966472 32.092908L768.004516 352.212795zM448.000226 544.033302a31.96286 31.96286 0 1 0 0-63.940169h-192.001129a31.937573 31.937573 0 1 0 0 63.878758l192.001129 0.061411zM256.017159 671.91364a31.959247 31.959247 0 1 0 0 63.922107l127.999549 0.018062a31.941185 31.941185 0 1 0 0-63.878757z" fill="" p-id="4088"></path></svg>
					        <svg t="1692344360583" class="icon" @click="Delete(item.paperid)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6082" width="200" height="200"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" fill="#575B66" p-id="6083"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" fill="#575B66" p-id="6084"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" fill="#575B66" p-id="6085"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" fill="#575B66" p-id="6086"></path></svg>
                        </div>
                      </span>
					</div>
					<div v-show="mypaper.whichshow2">
					    <router-view name="minefunctionView"/>
					</div>
				</div>
			</div>

			<!-- // 内容展示 -->
			<div class="own-size" :class="[Contentshowleft]">
				<div class="loader paper">
					<div class="title">
					<h3 class="h3">{{ title }}</h3>
					</div>
					<div class="content" id="editor1">
					<span v-html="leftcontent" class="content"></span>
					</div>
				</div>
			</div>
			<!-- //右页 -->
			<div class="own-size" :class="[Contentshowright]">
				<div class="loader paper">
					<div class="content2" id="editor2">
					    <span v-html="rightcontent" class="content"></span>
					</div>
				</div>
			</div>

			<!-- 首页内容展示 -->
			<div class="own-size" :class="[homecontentpage1]">
				<div class="loader paper">
					<div class="title">
					<h3 class="h3">{{ hometitle }}</h3>
					</div>
					<div class="content" id="editor1">
					<span v-html="homeleftcontent" class="content"></span>
					</div>
				</div>
			</div>
			<!-- //右页 -->
			<div class="own-size" :class="[homecontentpage2]">
				<div class="loader paper">
					<div class="content2" id="editor2">
					    <span v-html="homerightcontent" class="content"></span>
					</div>
				</div>
			</div>

			<div class="hard fixed back-side p251"> 
				<div v-show="showeditorbtn" class="editorbtn">
					<img src="../../image/editor.png" width="180" height="38" @click="changedrawer(true)">
				</div>
				<div class="depth"></div> 
			</div>
			<div class="hard p252"></div>
		</div>
	</div>
	<!-- 编辑模态框 -->
	<div class="modal-box">
		<router-view name="create"/>
	</div>
	<!-- 注册 -->
	<router-view name="register"/>
	<!-- 登录 -->
	<router-view name="login"/>
	<!-- 修改密码 -->
	<router-view name="XiupassView"/>
</div>
</div>
  
</template>

<script>
import mounted from './js/mounted'
import methods from './js/methods'
import data from './js/data'
import computed from './js/computed'
import created from './js/created'
import beforeRouteLeave from './js/beforeRouteLeave'
import watch from './js/watch'
import PrefacePage from '../../components/PrefacePage.vue'
export default {
	...data,
	...mounted,
	...methods,
	...created,
	...computed,
	...beforeRouteLeave,
	...watch,
	components: {
		PrefacePage
	}
}
</script>

<style scoped lang="less">
  @import './css/steve-jobs.css';
  @import './css/nav.css';
  @import './css/pagecontent.css';
</style>