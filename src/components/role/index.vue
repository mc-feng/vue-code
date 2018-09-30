<style scoped>
   .bookContent{
       margin:18px 0 18px 0
   }
</style>
<template>
     <div>
         <Row class="manage-header">
            <Col span="12">
              <ButtonGroup>
                <Button type="primary"  @click="adduser('formValidate')">新增</Button>
              </ButtonGroup>
            </Col>
        </Row>
        <Table border :columns="columns" :data="list" ref="selection" class="bookContent"></Table>
        <Modal
            v-model="modal"
            title="添加角色">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="header">
                    <Input v-model="formValidate.header" placeholder="请输权限名称"></Input>
                </FormItem>
                <FormItem label="描述" prop="explains">
                    <Input v-model="formValidate.explains" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入权限描述"></Input>
                </FormItem>
                <FormItem label="权限" prop="permission">
                    <CheckboxGroup v-model="formValidate.permission">
                        <Checkbox  v-for="item in resArr" :label="item.id" :key="item.id" :checked="true">{{item.powerName}}</Checkbox>
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
    export default {
        data () {
            return {
                modal:false,
                resArr:[],
                showAdd:false,
                columns: [
                    {
                        title: '角色名称',
                        key: 'roleName',
                    },
                    {
                        title: '角色描述',
                        key: 'explains'
                    },
                    {
                        title: '角色权限',
                        key: 'powerGradeName'
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
                                }, '编辑'),
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
                formValidate: {
                    header:'',
                    explains:'',
                    permission:[]
                },
                ruleValidate: {
                    header: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    explains: [
                        { required: true, message: '请输入描述内容', trigger: 'blur' },
                        { type: 'string', min: 20, message: '至少要有20字', trigger: 'blur' }
                    ],
                    permission: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个权限', trigger: 'change' },
                    ]
                }
            }
        },
        methods:{
            getData(){
                this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/role/select`,
                    data:{}
                }).then((response) => {
                    console.log(response)
                    this.list = response.data.result
                })
            },
            selectPower(){
                 this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/power/select`,
                    data:{}
                }).then((response) => {
                    console.log(response)
                    this.resArr = response.data.result
                })
            },
            show(res){
                this.$refs["formValidate"].resetFields();
                this.modal=true;
                this.showAdd = true;
                var newArr = [];
                var idArr = res.powerGrade.split(",")
                for(var i = 0;i<idArr.length;i++){
                    newArr.push(Number(idArr[i]))
                }
                var obj = {
                    header:res.roleName,
                    explains:res.explains,
                    permission:newArr,
                    id:res.id
                }
                this.formValidate=JSON.parse(JSON.stringify(obj))
            },
            remove(res){
                this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/role/delete`,
                    data:{
                        userName:"a",
                        id:res.id,
                        roleName:res.roleName
                    }
                }).then((response) => {
                    console.log(response)
                    this.getData();
                })
            },
            handleSubmit(name){
                console.log(this.formValidate.permission.join(","))
                this.$refs[name].validate((valid) => {
                    if(valid){
                        if(!this.showAdd){
                            this.axios({
                                method:'post',
                                url:`http://192.168.2.165:8082/role/add`,
                                data:{
                                    roleName:this.formValidate.header,
                                    createUser:"a",
                                    powerGrade:this.formValidate.permission.join(","),
                                    explains:this.formValidate.explains
                                }
                            }).then((response) => {
                                console.log(response)
                                this.modal = false
                                this.getData();
                            })
                        }else{
                        this.axios({
                                method:'post',
                                url:`http://192.168.2.165:8082/role/update`,
                                data:{
                                    roleName:this.formValidate.header,
                                    createUser:"a",
                                    powerGrade:this.formValidate.permission.join(","),
                                    explains:this.formValidate.explains,
                                    id:this.formValidate.id
                                }
                            }).then((response) => {
                                console.log(response)
                                this.modal = false
                                this.getData();
                            }) 
                        }
                    }
                })
            },
            handleReset(){
              this.modal = false
            },
            adduser(name){
                this.modal= true;
                this.showAdd = false;
                this.$refs[name].resetFields();
            }
        },
        mounted(){
        //首次加载显示
        this.getData();
        this.selectPower();
        }
    }
</script>
