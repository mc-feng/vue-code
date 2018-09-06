<style scoped>
   .bookContent{
       margin:18px 0 18px 0
   }
   #image-buttun{
       margin-left: 87px
   }
   .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
     <div>
        <Row>
             <Col span="8">
                <Input v-model="filter.name">
                    <Button slot="append" icon="ios-search" @click="onsearch"></Button>
                 </Input>
             </Col>
             <Col span="4">
              <ButtonGroup>
                <Button type="primary"  @click="adduser('formValidate')" id="image-buttun">新增</Button>
              </ButtonGroup>
            </Col>
        </Row>
        <Table border :columns="columns" :data="list" ref="selection" class="bookContent"></Table>
        <Page :total="filter.total" :page-size="filter.limit" :page-size-opts="[5,10,20,30,40]" show-sizer @on-change="onpagechange" @on-page-size-change="onPageSizeChange"></Page>
        <!-- 绑定数据 -->
        <Modal
            v-model="modal2"
            title="添加图片">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="50">
                <FormItem label="名称" prop="title">
                    <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                </FormItem>
                <FormItem label="内容" prop="content">
                       <quill-editor v-model="formValidate.content"
                                        ref="myQuillEditor">
                        </quill-editor>
                </FormItem>
                <FormItem label="焦点图">
                    <Upload
                    multiple
                    type="drag"
                    ref="upload"
                    accept="image/*"
                    :show-upload-list="false"
                    :with-credentials ="true"
                    :action="uploadUrl"
                    :format="imageFormat"
                    :before-upload="handleBeforeUpload">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"/>
                            <p>点击或拖拽文件上传</p>
                        </div>
                    </Upload>
                    <div class="demo-upload-list" v-for="item in uploadList">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                            </div>
                    </div>
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
    import md5 from 'crypto-js/md5';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data () {
            return {
                modal2:false,
                uploadUrl:"http://192.168.2.165:8082/photo/add",
                imageFormat:[],
                uploadList:[],
                MAX_FILE_NUM:3,
                columns: [
                    {
                        title: '名称',
                        key: 'title',
                    },
                    {
                        title: '内容',
                        key: 'text'
                    },
                    {
                        title: '图片',
                        key: 'patientPhone'
                    },
                    {
                        title: '有效期',
                        key: 'updateTime'
                    },
                    {
                        title: '置顶',
                        key: 'top'
                    },
                    {
                        title: '是否生效',
                        key: 'doc',
                        width: 150,
                        align: 'center',
                        render:(h,params) =>{
                            return h("div",[
                                h('i-switch', { //数据库1是已处理，0是未处理
                                    props: {
                                    type: 'primary',
                                    value: params.row.treatment === 1  //控制开关的打开或关闭状态，官网文档属性是value
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                                                            //参数value是回调值，并没有使用到
                                    }
                                    }
                                })
                            ])
                        }
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
                arr:[],
                filter:{
                    total:0,
                    limit:5,
                    page:1,
                    name:""
                },
                formValidate: {
                    title:'',
                    content:''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
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
        methods:{
            getData(){
                this.axios({
                        method:'post',
                        url:`http://192.168.2.165:8082/photo/selectallphoto`,
                        data:{}
                    }).then((response) => {
                        console.log(response)
                        this.list = response.data.result;
                        this.filter.total = response.data.total;
                    })
            },
            onsearch(){
              this.getData();
            },
            onpagechange(page){
              this.filter.page = page;
              this.getData();
            },
            onPageSizeChange(pageSize){
              this.filter.limit = pageSize;
              this.getData();
            },
            adduser(){
              this.modal2 = true
            },
            handleSubmit(){
                console.log(this.uploadList[0])
                this.axios({
                        method:'post',
                        url:`http://192.168.2.165:8082/photo/add`,
                        data:{
                            "text":this.formValidate.content,
                            "title":this.formValidate.title,
                            "createUserId":"a",
                            "type":0,
                            "top":1,
                            "file":this.uploadList[0]
                        }
                    }).then((response) => {
                        console.log(response)
                    })
              this.modal2 = false
            },
            handleReset(){
              this.modal2 = false
            },
            //阻止图片上传之间发给后台
            handleBeforeUpload (file) {
                console.log(file)
                // 判断文件类型是否是jpg/png/gif格式的图片
                if (!/^image/.test(file.type) || !/(png|jpg|gif)$/.test(file.name)) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: `文件 ${file.name} 格式不正确，请选择 ${this.imageFormat.join("/")} 格式的图片`
                })
                return false
                }
        
                const check = this.uploadList.length < this.MAX_FILE_NUM
                if (!check) {
                this.$Notice.warning({
                    title: '超出文件数量限制',
                    desc: `一次最多只能上传${this.MAX_FILE_NUM}张图片`
                })
                return false
                }
                console.log(file)
                // 创建一个 FileReader 对象
                let reader = new FileReader()
                // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
                // 读取文件作为 URL (base64编码)可访问地址
                reader.readAsDataURL(file)
        
                const _this = this
                reader.onload = function (e) {
                    file.url = reader.result
                    // 添加到用于手动上传的列表uploadList中并展示（即预览功能实现）
                    _this.uploadList.push(file)
                }
                // 取消自动上传的触发，手动上传
            },
            //删除图片
            handleRemove (s) {
                this.uploadList.pop()
            },
        },
        mounted(){
        //首次加载显示
        this.getData();
        }
    }
</script>