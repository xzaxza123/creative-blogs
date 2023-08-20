//登录模态框
<template>
<div>
    <el-dialog v-model="login.showlogin" width='30%' title="登录" :before-close="handleClose"> 
           <el-form
            label-position='top'
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon
           >
             <el-form-item label="用户名：" prop="name">
               <el-input v-model="ruleForm.name" type="text" autocomplete="off" maxlength='10' placeholder='请输入用户名'/>
             </el-form-item>

             <el-form-item label="密码：" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" maxlength='20' placeholder='请输入密码'/>
             </el-form-item>

           </el-form>

           <div class="btn">
               <router-link to="/book/register">没有账号?</router-link><br>
               <el-button @click='resetForm(ruleFormRef)'>取消</el-button>         
               <el-button type="primary" @click="submitForm(ruleFormRef,ruleForm)">登录</el-button>
           </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { reactive, ref } from 'vue';
import { ElMessageBox,ElMessage} from 'element-plus'
export default {
      setup(){
    const ruleFormRef = ref();


    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (ruleForm.checkPass !== '') {
          if (!ruleFormRef.value) return;
        }
        callback();
      }
    };

    const ruleForm = reactive({
      pass: '',
      name: '',
    });

    const rules = reactive({
      pass: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 8, max: 14, message: '密码长度在8~14之间', trigger: 'blur' }
      ],
      name: [
         { required: true, message: '请输入用户名', trigger: 'blur' },
         { min: 3, max: 10, message: '用户名长度在3~10之间', trigger: 'blur' },
      ]
    });


    return {
      ruleFormRef,
      validatePass,
      ruleForm,
      rules,
    }
  },
    computed: {
        ...mapState(['login'])
    },
    methods:{
      submitForm(formEl,value){
         if (!formEl) return;
         formEl.validate((valid) => {
           if (valid) {
              this.getlogin(value)
           } else {
             ElMessage({
               type: 'error',
               message: '登录失败',
               duration:1000
             })
             return false;
           }
         });
      },   
      resetForm(formEl){
        if (!formEl) return;
        formEl.resetFields();
        this.changeshowlogin2(false)
        this.$router.go(-2)
      },
      ...mapMutations(['changeshowlogin2']),
      ...mapActions(['getlogin']),
      handleClose(){
        ElMessageBox.confirm(
          '确定要退出登录吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }
          )
        .then(() => {
          this.changeshowlogin2(false)
          this.$router.go(-2)
          ElMessage({
            type: 'success',
            message: '已退出',
            duration:1000
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消',
            duration:1000
          })
        })
      }
    },
}
</script>

<style lang="less" scoped>
.btn{
  text-align: right;
  margin-top: 40px;
  a{
    text-align: left;
    display: block;
    margin-bottom: -40px;
  }
}
</style>