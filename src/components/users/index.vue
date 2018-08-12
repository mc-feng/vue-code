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
            title="数据操作">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="age" prop="age">
                    <Input v-model="formValidate.age" placeholder="Enter your age"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="City" prop="city">
                    <Select v-model="formValidate.city" placeholder="Select your city">
                        <Option value="北京">北京</Option>
                        <Option value="上海">上海</Option>
                        <Option value="深圳">深圳</Option>
                    </Select>
                </FormItem>
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="password" prop="password">
                    <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="Hobby" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
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
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '兴趣',
                        key: 'interest'
                    },
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '描述',
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
                    password: '',
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    age:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '年龄不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                     mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择你的城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: '请选择你的爱好', trigger: 'change' }
                    ],
                     date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请对自己进行介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        }, 
    }
</script>
