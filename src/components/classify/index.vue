<template>
    <div>
        <ButtonGroup>
                <Button type="primary" @click="addRoot" >新增根目录</Button>
        </ButtonGroup>
        <Row :gutter="50">
            <Col span="12">
                <Tree :data="data" :render="renderContent"></Tree>
            </Col>
        </Row>
        <Modal
            v-model="modal"
            title="数据操作">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="title" prop="title">
                    <Input v-model="formValidate.title" placeholder="请编写标题"></Input>
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
               data:[],
               buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },
                type:1,
                modal:false,
                nowdata:null,
                 formValidate: {
                    title:'',
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
           getData(){
             this.axios({
                    method:'post',
                    url:`http://localhost:3000/cate/tree`
                }).then((response) => {
                   this.data = response.data;
                })
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '40px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                this.nowdata = data
                this.modal = true;
                // const children = data.children || [];
                // children.push({
                //     title: 'appended node',
                //     expand: true
                // });
                // this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                console.log(data);
                this.axios({
                            method:'delete',
                            url:` http://localhost:3000/cate/data/${data._id} `,
                        }).then(response=>{
                            this.getData();
                        })
                if(data.parentId == null){
                    this.type--;
                }
                // const parentKey = root.find(el => el === node).parent;
                // const parent = root.find(el => el.nodeKey === parentKey).node;
                // const index = parent.children.indexOf(data);
                // parent.children.splice(index, 1);
            },
            handleSubmit (name) {
                if(this.nowdata == null){
                    this.type++;
                    this.axios({
                            method:'post',
                            url:` http://localhost:3000/cate/data `,
                            data:{type:this.type,title:this.formValidate.title}
                        }).then(response=>{
                            this.modal=false;
                            this.getData();
                        })
                    this.$refs[name].resetFields();
                }else{
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                         this.axios({
                            method:'post',
                            url:` http://localhost:3000/cate/data `,
                            data:{type:this.nowdata.type,title:this.formValidate.title,parentId:this.nowdata._id}
                        }).then(response=>{
                            this.modal=false;
                            this.getData();
                        })
                        this.$Message.success('Success!');
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('Fail!');
                    }
                  });
                }
                this.nowdata = null;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            addRoot(){
                this.modal=true;
            }
        },
        mounted(){
            this.getData();
        }

    }
</script>
