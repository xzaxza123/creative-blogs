// 修改信息
<template>
<div>
    <div class="headshot">
      <svg t="1692247209787" class="iconleft" @click="clickIcon('up')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6179" width="200" height="200"><path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z" fill="#575B66" p-id="6180"></path></svg>
      <el-avatar
        :size='95'
        :src="headshot[num].img"
      />
      <svg t="1692247165704" class="iconright" @click="clickIcon('down')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5226" width="200" height="200"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" fill="#575B66" p-id="5227"></path></svg>
    </div>
    <div>
        <el-form
            label-position='top'
            :model="ruleForm"
            :rules="rules"
            status-icon
            hide-required-asterisk
           >
             <el-form-item label="用户名：" prop="name">
               <el-input v-model="ruleForm.name" type="text" autocomplete="off" maxlength='10' class="inputDeep" placeholder='请输入用户名(10字)'/>
             </el-form-item>

             <el-form-item label="邮箱：" prop="staffEmail">
               <el-input v-model="ruleForm.staffEmail" type="email" autocomplete="off" maxlength='30' class="inputDeep" placeholder='请输入邮箱'/>
             </el-form-item>
        </el-form>
    </div>
    <div class="submit">
        <el-button
            :key="primary"
            size="large"
            text
            bg
            class="btn"
            @click="submit"
            >提交</el-button
        >
        <el-button
            :key="primary"
            size="large"
            text
            bg
            class="btn"
            @click="Cancel"
            >取消</el-button
        >
    </div>
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { ElMessageBox,ElMessage} from 'element-plus'
export default {
    data () {
        return {
            headshot:[
                {
                    id:1,
                    img:require('../image/headshot/0.png')
                },
                {
                    id:2,
                    img:require('../image/headshot/1.png')
                },
                {
                    id:3,
                    img:require('../image/headshot/2.png')
                },
                {
                    id:4,
                    img:require('../image/headshot/3.png')
                },
                {
                    id:5,
                    img:require('../image/headshot/4.png')
                },
                {
                    id:6,
                    img:require('../image/headshot/5.png')
                },
                {
                    id:7,
                    img:require('../image/headshot/6.png')
                },
                {
                    id:8,
                    img:require('../image/headshot/7.png')
                },
                {
                    id:9,
                    img:require('../image/headshot/8.png')
                }
            ],
            num:null,
            userid:null,
            ruleForm:{
                name:null,
                staffEmail:null,
            },
            rules:{
                name: [
                   { required: true, message: '请输入用户名', trigger: 'blur' },
                   { min: 3, max: 10, message: '用户名长度在3~10之间', trigger: 'blur' },
                ],
                staffEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: this.validate_email, trigger: ['blur'] }
                  ]
            }
        }
    },
    inject: ["reload"],
    methods:{
        ...mapActions(['changename']),
        clickIcon(value){
            if (value === 'down') {
                if (this.num === 8) {
                    this.num = 0
                }else{
                    this.num++
                }
            }else if (value === 'up') {
                if (this.num === 0) {
                    this.num = 8
                }else{
                    this.num--
                }
            }
        },
        validate_email(rule, value, callback){
          var emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
          var emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if ((!emailRegExp.test(value) && value != '') || (!emailRegExp1.test(value) && value != '')) {
            callback(new Error('请输入有效邮箱格式！'));
          } else {
            callback();
          }
        },
        //修改提交
        submit(){
            if (this.ruleForm.name != '' && this.ruleForm.staffEmail != '') {
                let data = {
                    headshot:this.num,
                    userid:this.userid,
                    name:this.ruleForm.name,
                    emali:this.ruleForm.staffEmail
                }
                this.changename(data)
                this.reload()
            }else if (this.ruleForm.name === '') {
                ElMessage({
                  type: 'error',
                  message: '用户名不能为空',
                  duration:1000
                })
            }else if (this.ruleForm.staffEmail === '') {
                ElMessage({
                  type: 'error',
                  message: '邮箱不能为空',
                  duration:1000
                })
            }
        },
        Cancel(){
            this.$router.back()
        }
    },
    //在页面渲染之前将sessionStorage数据取出
    created(){
        this.num = sessionStorage.getItem('headshot');
        this.ruleForm.name = sessionStorage.getItem('Loginedname');
        this.ruleForm.staffEmail = sessionStorage.getItem('emali');
        this.userid = sessionStorage.getItem('UserId');
    }
}
</script>

<style lang="less" scoped>
.headshot{
    position:relative;
    top: 20px;
    .iconleft{
        width:40px;
        height: 40px;
        position:absolute;
        left: 170px;
        top: 30px;
    }
    .iconright{
        width:40px;
        height: 40px;
        position:absolute;
        right: 170px;
        top: 28px;
    }
}
.el-form{
    width: 400px;
     position:absolute;
     top: 40%;
     left: 50%;
     transform: translate(-50%, -50%);
}
.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    .el-input__inner {
      cursor: default !important;
    }
  }
}
.btn{
  font-weight: bold;
}
.submit{
    position:absolute;
    left: 40%;
    top: 70%;
}
</style>