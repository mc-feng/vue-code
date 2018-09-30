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
                <FormItem label="名称" prop="powerName">
                    <Input v-model="formValidate.powerName" placeholder="请输权限名称"></Input>
                </FormItem>
                <FormItem label="描述" prop="explains">
                    <Input v-model="formValidate.explains" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入权限描述"></Input>
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
                showAdd:false,
                columns: [
                    {
                        title: '名称',
                        key: 'powerName',
                        width:150
                    },
                    {
                        title: '描述',
                        key: 'explains'
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
                    powerName:'',
                    explains:''
                },
                ruleValidate: {
                    powerName: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    explains: [
                        { required: true, message: '请输入描述内容', trigger: 'blur' },
                        { type: 'string', min: 20, message: '至少要有20字', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            getData(){
                this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/power/select`,
                    data:{}
                }).then((response) => {
                    console.log(response)
                    this.list = response.data.result
                })
            },
            show(res){
                this.$refs["formValidate"].resetFields();
                this.modal=true;
                this.showAdd = true;
                this.formValidate=JSON.parse(JSON.stringify(res))
            },
            remove(res){
                console.log(res)
                this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/power/delete`,
                    data:{
                        name:"a",
                        id:res.id,
                        roleName:res.powerName
                    }
                }).then((response) => {
                    console.log(response)
                    if(response.data.success){
                     this.getData();
                    }else{
                        this.$Notice.warning({
                                        title: '无法删除',
                                        desc: response.data.message
                       })
                    }
                })
            },
            handleSubmit(name){
                console.log(this.formValidate)
                this.$refs[name].validate((valid) => {
                    if(valid){
                        if(!this.showAdd){
                            this.axios({
                                method:'post',
                                url:`http://192.168.2.165:8082/power/add`,
                                data:{
                                    powerName:this.formValidate.powerName,
                                    createUser:"a",
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
                                url:`http://192.168.2.165:8082/power/update`,
                                data:{
                                    powerName:this.formValidate.powerName,
                                    updateUser:"a",
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
        }
    }
</script>
