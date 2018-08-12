import md5 from 'crypto-js/md5';
export default {
    data(){
       return{
        modal: false,
        module:'users',
        filter:{
            total:0,
            limit:5,
            page:1,
            name:""
          }
       }
    },
    methods: {
        show (res) {
            this.formValidate=JSON.parse(JSON.stringify(res));
            this.modal=true;
            // this.$Modal.info({
            //     title: 'User Info',
            //     content: `Name：${res.name}<br>Age：${res.age}<br>City：${res.city}<br>`
            // })
        },
        remove (row) {
            this.axios({
                method:'delete',
                url:` http://localhost:3000/${this.module}/data/${row._id}`
            }).then(response=>{
                this.getData();
            })
        },
        getData(){
            this.axios({
                    method:'post',
                    url:`http://localhost:3000/${this.module}/list`,
                    data:this.filter
                }).then((response) => {
                   this.list = response.data.rows;
                   this.filter.total = response.data.total;
                   this.filter.limit = response.data.limit;
                })
        },
         handleSubmit (name) {
          if(this.formValidate._id == null){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.formValidate)
                    console.log(md5(this.formValidate.password).toString())
                    this.formValidate.password = md5(this.formValidate.password).toString()
                    this.axios({
                        method:'post',
                        url:`http://localhost:3000/${this.module}/data`,
                        data:this.formValidate
                    }).then((response) => {
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
                        method:'put',
                        url:`http://localhost:3000/${this.module}/data/${this.formValidate._id}`,
                        data:this.formValidate
                    }).then((response) => {
                        this.getData();
                        })
                this.$Message.success('修改成功!');
                this.modal=false;
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
        adduser(name){
            this.modal= true;
            this.$refs[name].resetFields();
        },
        selectionChange(selection){
            this.selection = selection
        },
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
        onsearch(){
            this.getData();
        }
    },
    mounted(){
        this.getData();
    }
}