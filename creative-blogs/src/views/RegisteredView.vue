//登录模态框
<template>
    <div>
        <el-dialog v-model="login.showregiste" width='30%' title="注册" :before-close="handleClose"> 
           <el-form
            label-position='top'
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon
           >
             <el-form-item label="用户名：" prop="name">
               <el-input v-model="ruleForm.name" type="text" autocomplete="off" maxlength='10' placeholder='请输入用户名(10字)'/>
             </el-form-item>

             <el-form-item label="密码：" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" maxlength='20' placeholder='请输入密码'/>
             </el-form-item>

             <el-form-item prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" maxlength='20' placeholder='请再次输入密码'/>
             </el-form-item>

             <el-form-item label="邮箱：" prop="staffEmail">
               <el-input v-model="ruleForm.staffEmail" type="email" autocomplete="off" maxlength='30' placeholder='请输入邮箱'/>
             </el-form-item>


           </el-form>

           <div class="btn">
               <router-link to="/book/login" @click="changeshowlogin2(true)">已有账号?</router-link><br>
               <el-button @click='resetForm(ruleFormRef)'>取消</el-button>         
               <el-button type="primary" @click="submitForm(ruleFormRef,ruleForm)">提交</el-button>
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
          ruleFormRef.value.validateField('checkPass', () => null);
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输入密码'));
       }else if (value !== ruleForm.pass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    const validate_email = (rule, value, callback) => {
      var emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      var emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if ((!emailRegExp.test(value) && value != '') || (!emailRegExp1.test(value) && value != '')) {
        callback(new Error('请输入有效邮箱格式！'));
      } else {
        callback();
      }
    };

    const ruleForm = reactive({
      pass: '',
      checkPass: '',
      name: '',
      staffEmail:'',
    });

    const rules = reactive({
      pass: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 8, max: 14, message: '密码长度在8~14之间', trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      name: [
         { required: true, message: '请输入用户名', trigger: 'blur' },
         { min: 3, max: 10, message: '用户名长度在3~10之间', trigger: 'blur' },
      ],
      staffEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validate_email, trigger: ['blur'] }
        ]
    });

    


    return {
      ruleFormRef,
      validatePass,
      validatePass2,
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
              this.getregistered(value)
           } else {
             ElMessage({
               type: 'error',
               message: '注册失败',
               duration:1000
             })
             return false;
           }
         });
      },   
      resetForm(formEl){
        if (!formEl) return;
        formEl.resetFields();
        this.changeshowlogin(false)
        this.$router.back()
      },
      ...mapMutations(['changeshowlogin','changeshowlogin2','registesuccess']),
      ...mapActions(['getregistered']),
      handleClose(){
        ElMessageBox.confirm(
          '确定要退出注册吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }
          )
        .then(() => {
          this.changeshowlogin(false)
          this.$router.back()
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
      },
    },
    watch: {
      'login.registestate'(value){
        if (value === 1) {
          this.$router.push('/book/login')
          this.changeshowlogin2(true)
        }
      }
    },
    beforeRouteLeave(to, from){
      this.registesuccess(0)
    }
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