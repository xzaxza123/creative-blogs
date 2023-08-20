//初始页面
<template>
<div>
   <router-link to="/book">
   <img src="../image/1.jpg" @click='addanimation' id="img">
   </router-link> 
     <router-view/>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  
  }
</script>

<style lang="less" scoped>
div {
  position: relative;
  height: 100vh; /* 或者设置一个固定高度，保证居中的元素在页面中可见 */
}

img {
  position: absolute;
  width: 456px;
  height: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
