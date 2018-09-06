<style scoped>
   .bookContent{
       margin:18px 0 18px 0
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
        </Row>
        <Table border :columns="columns" :data="list" ref="selection" class="bookContent"></Table>
        <Page :total="filter.total" :page-size="filter.limit" :page-size-opts="[5,10,20,30,40]" show-sizer @on-change="onpagechange" @on-page-size-change="onPageSizeChange"></Page>
     </div>
</template>
<script>
    import md5 from 'crypto-js/md5';
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '姓名',
                        key: 'userName',
                    },
                    {
                        title: '身份证号',
                        key: 'userBoth'
                    },
                    {
                        title: '手机号',
                        key: 'userPhone'
                    },
                ],
                list: [],
                arr:[],
                filter:{
                    total:0,
                    limit:5,
                    page:1,
                    name:""
                }
            }
        },
        methods:{
            getData(){
                this.axios({
                        method:'post',
                        url:`http://192.168.2.165:8082/account/getwechat`,
                        data:{
                            name:this.filter.name,
                            id:this.filter.page,
                            userSex:this.filter.limit
                        }
                    }).then((response) => {
                        console.log(response)
                        this.list = response.data.result
                        this.filter.total = response.data.total
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
        },
        mounted(){
        //首次加载显示
        this.getData();
        }
    }
</script>
