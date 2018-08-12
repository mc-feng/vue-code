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
     </div>
    
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
                module:'comment',
                newsUrl:location.href.split("/")[location.href.split("/").length-1],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '评论标题',
                        key: 'title',
                    },
                    {
                        title: '评论内容',
                        key: 'content',
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
                                            console.log(location.href.split("/"))
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
                filter:{
                    newsId:""
                },
                formValidate: {
                    title:'',
                    content:'',
                    newsId:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                    ]
                }
            }
        }, 
        components: {
            quillEditor
        },
        mounted(){
           this.formValidate.newsId = this.newsUrl
           this.filter.newsId = this.newsUrl
        }
    }
</script>
