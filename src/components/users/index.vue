<template>
     <div>
        <Row>
            <Col span="12">
              <ButtonGroup>
                <Button type="primary"  @click="adduser('formValidate')">新增</Button>
                <Button type="error" @click="deletemore">删除多个</Button>
              </ButtonGroup>
            </Col>
             <Col span="12">
                <Input v-model="filter.name">
                    <Button slot="append" icon="ios-search" @click="onsearch"></Button>
                 </Input>
             </Col>
        </Row>
        <Table border :columns="columns" :data="list" ref="selection" @on-selection-change='selectionChange'></Table>
         <Page :total="filter.total" :page-size="filter.limit" :page-size-opts="[5,10,20,30,40]" show-sizer @on-change="onpagechange" @on-page-size-change="onPageSizeChange"></Page>
        <Modal
            v-model="modal"
            title="添加管理员">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="账号" prop="account">
                    <Input v-model="formValidate.account" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formValidate.passwd" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="passwdCheck">
                    <Input type="password" v-model="formValidate.passwdCheck" placeholder="请再次输入密码"></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入您的手机号码"></Input>
                </FormItem>
                <FormItem label="出生年月">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="请选择出生年月日" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="角色" prop="role">
                    <Select v-model="formValidate.role" placeholder="选择你的角色">
                        <Option value="员工">员工</Option>
                        <Option value="管理员">管理员</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
     </div>
    
</template>
<script>
    import base from '../../common/Base'
    export default {
        mixins:[base],
        data () {
            // 自定义的正则表达式
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入您的密码'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('两次密码不匹配'));
                } else {
                    callback();
                }
            };
            const validatePhone = (rule, value, callback)=>{
                if(value === ""){
                    callback(new Error('电话号码不能为空'))
                }else if(!/^1[34578]\d{9}$/.test(value)){
                    callback(new Error('电话号码格式不正确'));
                }else{
                    callback();
                }
            }
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '账号',
                        key: 'age'
                    },
                    {
                        title: '性别',
                        key: 'password'
                    },
                    {
                        title: '角色',
                        key: 'role'
                    },
                    {
                        title: '手机号',
                        key: 'interest'
                    },
                    {
                        title: '出生年月',
                        key: 'date'
                    },
                    {
                        title: '最后一次登录时间',
                        key: 'desc'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list: [],
                selection:[],
                arr:[],
                formValidate: {
                    passwd: '',
                    passwdCheck: '',
                    account:'',
                    phone:'',
                    role: '',
                    gender: '',
                    date: '',
                    name:''
                },
                ruleValidate: {
                    account:[
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, validator:validatePhone, trigger: 'blur'},
                    ],
                    role: [
                        { required: true, message: '请选择你的角色', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    passwd: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true,validator: validatePassCheck, trigger: 'blur' }
                    ],
                }
            }
        }, 
    }
</script>
