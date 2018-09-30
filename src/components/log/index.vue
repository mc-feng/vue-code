<style scoped>
   .bookContent{
       margin:18px 0 18px 0
   }
</style>
<template>
     <div>
        <Row>
             <Col span="8">
                <Input v-model="filter.name" @keyup.enter.native="onsearch">
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
                        title: '账号',
                        key: 'name',
                    },
                    {
                        title: '操作',
                        key: 'passWard'
                    },
                    {
                        title: '时间',
                        key: 'updateTime'
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
                        url:`http://192.168.2.165:8082/account/getlogin`,
                        data:{
                            id:this.filter.page,
                            userSex:this.filter.limit,
                            name:this.filter.name
                        }
                    }).then((response) => {
                        console.log(response)
                        this.list = response.data.result;
                        this.filter.total = response.data.total;
                    })
            },
            onsearch(){
              this.filter.page = 1
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
