<style scoped>
 .bj{
     width: 100%;
     height: 100%;
     background:url('../assets/d6039f21c57e23ae7da3f70a13e5c7ec.jpg') no-repeat 100% ;
     position: relative;
 }
 .bg{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
    width: 200px;
    height: 200px;
 }
</style>
<template>
    <div class="bj">
        <div class="bg">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline >
                                <FormItem prop="user">
                                    <Input type="text" v-model="formInline.user" placeholder="Username">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="formInline.password" placeholder="Password">
                                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                                </FormItem>
         </Form>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return{
                 formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
         methods:{
            ...mapActions(['checkLogin']),
             handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkLogin(true);
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
         computed: {
            ...mapGetters(['login'])
        },
    }
</script>