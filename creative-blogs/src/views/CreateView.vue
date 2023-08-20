// 富文本模态框
<template>
  <div>
      <el-drawer v-model="create.drawer" :with-header="false" direction="ttb" size='100%' class='modal-box'>
         <WangEditor/>
      </el-drawer>
  </div>
</template>

<script>
import WangEditor from '../components/WangEditor'
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['create'])
  },
  components: {
    WangEditor
  }
}
</script>

<style lang="less" scoped>

</style>