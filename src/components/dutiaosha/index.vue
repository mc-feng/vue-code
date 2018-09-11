<template>
     <Row>
         <Col span="6" order="1">
            <h2>新闻分类</h2>
            <Tree :data="classData" @on-select-change='treeChange'></Tree>
         </Col>
         <Col span="18" order="2">
            <Row>
                <Col span="12">
                <ButtonGroup>
                    <Button type="primary"  @click="adduser('formValidate')" :disabled='anbooln'>新增</Button>
                    <Button type="error" @click="deletemore">删除多个</Button>
                </ButtonGroup>
                </Col>
                <Col span="12">
                    <Input v-model="filter.title">
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
                    <FormItem label="title" prop="title">
                        <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                    </FormItem>
                    <FormItem label="content" prop="content">
                       <quill-editor v-model="formValidate.content"
                                        ref="myQuillEditor">
                        </quill-editor>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
                <div slot="footer"></div>
            </Modal>
         </Col>
     </Row>
</template>
<script>
    import base from '../../common/Base';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    import { quillEditor } from 'vue-quill-editor';
    export default {
        mixins:[base],
        data () {
            return {
                module:'news',
                id:this.$route.params.id,
                anbooln:true,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '评论',
                        key: 'commentCount'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goComment(params.row)
                                        }
                                    }
                                }, '查看评论'),
                            ]);
                        }
                    }
                ],
                list: [],
                selection:[],
                arr:[],
                formValidate: {
                    title:'',
                    content:'',
                    cateId:'',
                },
                filter:{
                   cateId:null,
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请编写内容', trigger: 'blur' },
                        { type: 'string', min:10 , message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
                classData:[]
            }
        },
         methods:{
             getClassData(){
                  this.axios({
                    method:'post',
                    url:`http://localhost:3000/cate/tree`,
                    data:{type:1}
                }).then((response) => {
                   this.classData = response.data;
                })
             },
            treeChange(res){
                this.anbooln = false;
                this.filter.page = 1;
                if(res.length==1){
                       this.formValidate.cateId = res[0]._id;
                       this.filter.cateId = res[0]._id;
                       this.getData();
                }
           
            },
            goComment(row){
                this.$router.push({path:`/comment/${row._id}`})
            }
         },
         mounted(){
            this.getClassData();
        },
        components: {
            quillEditor
        }
    }
</script>
