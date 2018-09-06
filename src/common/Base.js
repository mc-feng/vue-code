import md5 from 'crypto-js/md5';
export default {
    data(){
       return{
        modal: false,//显示弹框
        //分页数据
        filter:{
            total:0,
            limit:5,
            page:1,
            name:""
          }
       }
    },
    methods: {
        //修改
        show (res) {
            var gender = "1"
            if(res.userSex == "男"){
                gender = "0"
            }
            var role = "1"
            if(res.roleGrade == "信息管理员"){
                role = "2"
            }
            console.log(res)
            var subObject = {
                passwd:res.passWard,
                passwdCheck:res.passWard,
                account:res.name,
                phone:res.userPhone,
                role: role,
                gender: gender,
                date: res.userBoth,
                name:res.userName,
                id:res.id
            }
            this.formValidate=JSON.parse(JSON.stringify(subObject));
            this.modal=true;
            // this.$Modal.info({
            //     title: 'User Info',
            //     content: `Name：${res.name}<br>Age：${res.age}<br>City：${res.city}<br>`
            // })
        },
        //删除
        remove (row) {
            console.log(row)
            this.axios({
                method:'post',
                url:`http://192.168.2.165:8082/account/delete`,
                data:{
                    name:"a",
                    userName:row.name
                }
            }).then(response=>{
                console.log(response)
                this.getData();
            })
        },
        //获取数据
        getData(){
            this.axios({
                    method:'post',
                    url:`http://192.168.2.165:8082/account/queryalluser`,
                    data:{
                        name:this.filter.name
                    }
                }).then((response) => {
                    console.log(response)
                    var arrData = response.data.result
                    for(var i = 0;i<arrData.length;i++){
                        if(arrData[i].userSex == 0){
                            arrData[i].userSex = "男"
                        }else if(arrData[i].userSex == 1){
                            arrData[i].userSex = "女"
                        }
                    }
                   this.list = response.data.result;
                   this.filter.total = response.data.total;
                   this.filter.limit = response.data.limit;
                })
        },
        //提交数据
         handleSubmit (name) {
          if(this.formValidate.id == null){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.formValidate)
                    // console.log(md5(this.formValidate.password).toString())
                    this.formValidate.password = md5(this.formValidate.password).toString()
                    this.axios({
                        method:'post',
                        url:`http://192.168.2.165:8082/account/register`,
                        data:{
                            name:this.formValidate.account,
                            passWard:this.formValidate.passwd,
                            userName:this.formValidate.name,
                            roleGrade:this.formValidate.role,
                            userPhone:this.formValidate.phone,
                            userSex:this.formValidate.gender,
                            userBoth:this.formValidate.date
                        }
                    }).then((response) => {
                        console.log(response)
                        this.getData();
                        })
                    this.$Message.success('新增成功!');
                    this.modal=false;
                } else {
                    this.$Message.error('增加失败!');
                }
            })
          }else{
              this.axios({
                        method:'post',
                        url:`http://192.168.2.165:8082/account/modify`,
                        data:{
                            name:this.formValidate.account,
                            passWard:this.formValidate.passwd,
                            userName:this.formValidate.name,
                            roleGrade:this.formValidate.role,
                            userPhone:this.formValidate.phone,
                            userSex:this.formValidate.gender,
                            userBoth:this.formValidate.date
                        }
                    }).then((response) => {
                        console.log(response)
                        this.$Message.success('修改成功!');
                        this.modal=false;
                        this.formValidate.id = null
                        this.getData();
                    })
          }
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        onpagechange(page){
             this.filter.page = page;
             this.getData();
        },
        onPageSizeChange(pageSize){
            this.filter.limit = pageSize;
            this.getData();
        },
        //新增用户
        adduser(name){
            this.modal= true;
            this.$refs[name].resetFields();
        },
        //选择那一项
        selectionChange(selection){
            this.selection = selection
        },
        //多项删除
        deletemore(){
            var ids='';
            for(let i=0;i<this.selection.length;i++){
              this.arr.push(this.selection[i]._id ) 
            };
             ids = this.arr.toString();
             console.log(ids);
             this.axios({
                        method:'post',
                        url:`http://localhost:3000/${this.module}/data/removes`,
                        data:{
                            ids:ids
                        }
                    }).then((response) => {
                        this.getData();
                        })
        },
        //搜索
        onsearch(){
            this.getData();
        }
    },
    mounted(){
        //首次加载显示
        this.getData();
    }
}