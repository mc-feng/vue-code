<style scoped>
.clear:after{
    content: "";
    display:block;
    visibility:hidden;
    clear:both;
}
 .bj{
     width: 100%;
     height: 100%;
     background:url('../assets/bjimage.png') no-repeat 100% ;
     position: relative;
 }
 .header{
     width: 100%;
     height: 80px;
     background: rgba(0,106,195,0.7);
     position: absolute;
     left: 0;
     top: 0;
 }
 .header-logo{
     padding: 8px 0 0 56px;
     height: 80px;
     width: 185px;
     background-color: rgba(0,106,195,1);
     position: absolute;
     left: 0;
     right: 0;
 }
 .header-font{
     height: 80px;
     line-height: 80px;
     margin-left:185px;
     font-family: PingFangSC-Medium;
     font-size: 18px;
     color: #FFFFFF;
     text-align: left;;
 }
 .header-font i{
     float: left;
     color: #FFFFFF;
     text-align: left;
     font-style: normal;
 }
 .bg{
    border-radius: 10px;
    box-shadow: -1px -1px 15px #ccc, 3px 4px 18px #ccc;
    width: 1000px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -500px;
 }
.bg-left{
  padding:60px 0 0 85px; 
  border-radius: 10px 0 0 10px;
  height: 500px;
  width: 420px;
  background-color: rgba(0,106,195,0.7);
  position: absolute;
  left: 0;
  top: 0;
  }
  .logo{
      margin-left: 60px;
      display: block;
      width: 120px;
      height: 120px;
  }
  .bg-left-font{
      margin-top: 60px;
      font-size: 22px;
      width: 250px;
      height: 39px;
      line-height: 39px;
      text-align: center;
      color: #FFFFFF;
  }
  .bg-left-bottom{
      margin-left: 70px;
      margin-top: 144px;
      font-size: 18px;
      color: #FFFFFF;
      font-weight: 100;
  }
  .bg-right{
      padding-left: 100px;
      border-radius: 0 10px 10px 0;
      position: absolute;
      left: 420px;
      width: 580px;
      height: 500px;
      background-color: #FFFFFF;
  }
  .bg-right-top{
      margin-top: 70px;
      height: 50px;
      line-height: 50px;
      font-size: 40px;
      color: rgb(0,106,195)
  }
  .bg-right-table{
      margin-top: 80px;
      width: 380px
  }
  .bg-right-table1 {
      width: 380px;
  }
  .bg-right-buttun{
     margin-left: 10px;
     margin-top:30px;
     width: 360px;
     height: 40px;
  }
</style>
<template>
    <div class="bj">
        <Layout>
            <Header class="header">
                <div class="header-logo"> <img src="../assets/logos.png" alt="this is logo"></div>
                <div class="header-font clear"><i>上海市公共卫生管理中心后台管理系统</i></div>
            </Header>
            <div class="bg">
                <div class="bg-left">
                    <img src="../assets/biglogo.png" alt="this is logo" class="logo">
                    <div class="bg-left-font">上海市公共卫生管理中心</div>
                    <div class="bg-left-bottom">WELCOM</div>
                </div>
                <div class="bg-right">
                    <div class="bg-right-top">LOGING/登录</div>
                     <Form ref="formInline" :model="formInline" :rules="ruleInline" class="bg-right-table">
                                    <FormItem prop="user" class="bg-right-table1">
                                        <Input type="text" v-model="formInline.user" placeholder="Username">
                                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="password" class="bg-right-table1">
                                        <Input type="password" v-model="formInline.password" placeholder="Password" @keyup.enter.native="handleSubmit('formInline')">
                                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                        </Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" @click="handleSubmit('formInline')" class="bg-right-buttun">登录</Button>
                                    </FormItem>
                     </Form>
                </div>
            </div>
            <Modal
                v-model="logForce"
                title="您的账号已经在其他的地方登录"
                @on-ok="ok"
                @on-cancel="cancel">
                <p>是否强制登录</p>
            </Modal>
        </Layout>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return{
                logForce:false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少6位以上', trigger: 'blur' }
                    ]
                },
                status:0
            }
        },
         methods:{
            ...mapActions(['checkLogin']),
             handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                this.$emit("listenToChild",this.formInline.user)
                    let that = this;
                    if (valid) {
                        this.axios({
                            method:'post',
                            url:`http://192.168.2.165:8082/account/login`,
                            data:{
                                "name":this.formInline.user,
                                "passWard":this.formInline.password,
                                "status":this.status
                            }
                        }).then(response=>{
                            console.log(this.formInline.user)
                            if(response.data.success){
                                this.$store.commit('saveName',this.formInline.user)     
                                this.checkLogin(true);
                                this.$Message.success('登录成功');
                            }else if(response.data.result == 1){
                                this.logForce =true
                            }else{
                                this.$Message.error('账号或者密码错误')
                            }
                        })
                    } else {
                        this.$Message.info('您还没有添加账号密码');
                    }
                })
            },
            ok () {
                this.status = 1
                this.axios({
                            method:'post',
                            url:`http://192.168.2.165:8082/account/login`,
                            data:{
                                "name":this.formInline.user,
                                "passWard":this.formInline.password,
                                "status":this.status
                            }
                        }).then(response=>{
                            console.log(this.formInline.user)
                            if(response.data.success){     
                                this.checkLogin(true);
                                this.$store.commit('saveName',this.formInline.user) 
                                this.$Message.success('强制登录成功');
                            }else{
                                this.$Message.error('强制登录失败');
                                this.logForce =false
                            }
                        })
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        },
         computed: {
            ...mapGetters(['login'])
        },
    }
</script>