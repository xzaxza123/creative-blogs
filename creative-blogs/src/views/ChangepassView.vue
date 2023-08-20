// 修改密码
<template>
    <div>
        <el-dialog v-model="change.show" width='30%' title="修改密码" :before-close="handleClose"> 
           <el-form
            label-position='top'
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon
           >

             <el-form-item  prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" maxlength='20' placeholder='请输入密码'/>
             </el-form-item>

             <el-form-item prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" maxlength='20' placeholder='请再次输入密码'/>
             </el-form-item>
           </el-form>

           <div class="btn">
               <el-button @click='resetForm(ruleFormRef)'>取消</el-button>         
               <el-button type="primary" @click="submitForm(ruleFormRef,ruleForm)">提交</el-button>
           </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
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

    const ruleForm = reactive({
      pass: '',
      checkPass: '',
    });

    const rules = reactive({
      pass: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 8, max: 14, message: '密码长度在8~14之间', trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
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
    ...mapState(['change'])
  },
  data () {
    return {
      userid:null,
    }
  },
  methods: {
    ...mapMutations(['changeshow','LOGOUT','changeshowlogin2']),
    ...mapActions(['changepass']),
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
          this.changeshow(false)
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
    submitForm(formEl,value){
         if (!formEl) return;
         formEl.validate((valid) => {
           if (valid) {
            let data = {
              pass : value.pass,
              userid:this.userid
            }
            this.changepass(data)
            this.changeshow(false)
            this.LOGOUT()
            setTimeout(()=>{
              this.$router.push('/book/login')
              this.changeshowlogin2(true)
            },2500)
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
        this.changeshow(false)
        this.$router.back()
      },
  },
  created(){
        this.userid = sessionStorage.getItem('UserId');
  }
}
</script>